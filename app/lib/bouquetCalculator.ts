import type { FlowerSource } from "@/app/lib/flowerSrc";
type FlowerSide = {
  index: number;
  angle: number;
  yDisplacment: number;
  layer: number;
};

type FlowerTopDown = {
  index: number;
  x: number;
  y: number;
  radiusIndex: number;
};
type Flowers = {
  flowerSrcs: FlowerSource[];
  topDown: FlowerTopDown[];
  fromSide: FlowerSide[];
};

type FlowerPlacement = {
  curLayer: number;
  flowersByLayer: number[];
  curRadiusIndex: number;
  flowersByRadius: number[];
};

export type { Flowers, FlowerPlacement };
export default class BouquetBuilder {
  topDownSize: number;
  topDownRadiusStep: number;
  sideMaxAngle: number;
  sideAspect: { width: number; height: number };
  sideOriginDisplacementFactor: number;
  sideXmarginFactor: number;
  sideYDisplacmentStep: number;
  flowers: Flowers;
  placement: FlowerPlacement;
  totalFlowers: number;

  constructor(
    topDownSize: number,
    topDownRadiusStep: number,
    sideAspect: { width: number; height: number },
    sideOriginDisplacementFactor: number,
    sideXmarginFactor: number,
    sideYDisplacmentStep: number,
  ) {
    this.topDownSize = 1;
    this.topDownRadiusStep = topDownRadiusStep;
    this.sideMaxAngle = Math.PI;
    this.sideAspect = sideAspect;
    this.sideOriginDisplacementFactor = sideOriginDisplacementFactor;
    this.sideXmarginFactor = sideXmarginFactor;
    this.sideYDisplacmentStep = sideYDisplacmentStep;
    this.totalFlowers = 0;

    this.flowers = {
      flowerSrcs: [],
      topDown: [],
      fromSide: [],
    };
    this.placement = {
      curLayer: 0,
      curRadiusIndex: 0,
      flowersByLayer: [0],
      flowersByRadius: [0],
    };
  }
  /**
   * Add or removes a flower form a bouquet and calculates the new positions. From top down perspective.
   *
   * @param add whether to add or remove a flower. When true a flower is added, when false a flower is removed.
   */
  calculateTopDown(add: boolean) {
    if (!add && this.flowers.topDown.length === 0) {
      console.log("No flowers to remove");
      return;
    }
    let curRadiusIndex = this.placement.curRadiusIndex;
    let curRadius = curRadiusIndex * this.topDownRadiusStep;
    let curFlowersAmount = this.placement.flowersByRadius[curRadiusIndex];
    let updatedFlowersAmount = curFlowersAmount + (add ? 1 : -1);

    // If there are no flowers in the current radius and we are removing a flower, we go back to the previous radius.
    if (!add && updatedFlowersAmount <= 0 && curRadiusIndex > 0) {
      this.flowers.topDown.pop();
      this.placement.flowersByRadius.pop();
      this.placement.curRadiusIndex = curRadiusIndex - 1;
      return;
    }
    if (
      add &&
      // If the current radius has more flowers than it can hold, we move to the next radius.
      updatedFlowersAmount >
        Math.ceil((2 * Math.PI * curRadius) / this.topDownSize) &&
      this.flowers.topDown.length != 0 // We don't want to move to the next radius if we are adding the first flower.
    ) {
      console.log("Moving to next radius");
      // We move to the next radius.
      curRadiusIndex++;
      curRadius = curRadiusIndex * this.topDownRadiusStep;
      curFlowersAmount = 0;
      updatedFlowersAmount = 1;
      this.placement.flowersByRadius.push(0);
    }
    let updatedTopdownFlowers: FlowerTopDown[] = [];

    for (let i = 0; i < updatedFlowersAmount; i++) {
      // Calculate the angle of the flower in the circle. We start at the top of the circle.
      let theta =
        ((2 * Math.PI) / updatedFlowersAmount) * i -
        Math.PI / 2 +
        curRadiusIndex * ((10 * Math.PI) / 180);

      updatedTopdownFlowers.push({
        index: this.flowers.topDown.length - curFlowersAmount + i,
        x: Math.round(curRadius * Math.cos(theta) * 10000) / 10000,
        y: Math.round(curRadius * Math.sin(theta) * 10000) / 10000,
        radiusIndex: curRadiusIndex,
      });
    }

    this.flowers.topDown.splice(
      this.flowers.topDown.length - curFlowersAmount,
      curFlowersAmount,
      ...updatedTopdownFlowers,
    );
    this.placement.curRadiusIndex = curRadiusIndex;
    this.placement.flowersByRadius[curRadiusIndex] = updatedFlowersAmount;
  }
  /**
   *  Add or removes a flower form a bouquet and calculates the new positions. From side perspective.
   *
   * @param add whether to add or remove a flower
   * @returns
   */
  calculateSidePositions(add: boolean) {
    if (!add && this.flowers.topDown.length === 0) {
      console.log("No flowers to remove side");
      return;
    }
    let curLayer = this.placement.curLayer;
    let curFlowersAmount = this.placement.flowersByLayer[curLayer];
    let flowersByLayer = this.placement.flowersByLayer;
    flowersByLayer[curLayer] = curFlowersAmount + (add ? 1 : -1);
    // Calculate the angle of the flower in the circle. angle = A length that it will take to fit all the flowers in one line / The current radius
    let angle =
      (flowersByLayer[curLayer] *
        (this.sideAspect.width + this.sideXmarginFactor)) /
      (curLayer * (this.sideYDisplacmentStep * this.sideAspect.height) +
        this.sideAspect.height * this.sideOriginDisplacementFactor);

    if (!add && flowersByLayer[curLayer] <= 0 && curLayer > 0) {
      this.placement.curLayer = curLayer - 1;
      this.placement.flowersByLayer.pop();
      this.flowers.fromSide.pop();

      console.log("after layer change", curFlowersAmount);
      return;
    }
    if (angle > this.sideMaxAngle && add) {
      flowersByLayer[curLayer] = curFlowersAmount;
      curLayer++;
      angle = 0;
      curFlowersAmount = 0;
      flowersByLayer.push(1);
    }
    let updatedSideFlowers = [];
    let rotateBy = angle / flowersByLayer[curLayer];
    let midIndex = (flowersByLayer[curLayer] - 1) / 2;

    for (let i = 0; i < flowersByLayer[curLayer]; i++) {
      updatedSideFlowers.push({
        index: this.flowers.fromSide.length - curFlowersAmount + i,
        angle: Math.round(rotateBy * (i - midIndex) * 100) / 100,
        yDisplacment: curLayer * this.sideYDisplacmentStep,
        layer: curLayer,
      });
    }
    this.flowers.fromSide.splice(
      this.flowers.fromSide.length - curFlowersAmount,
      curFlowersAmount,
      ...updatedSideFlowers,
    );
    this.placement.curLayer = curLayer;
    this.placement.flowersByLayer = flowersByLayer;
  }
  /**
   * Add or removes a flower form a bouquet and calculates the positions for side and top down perspectives.
   *
   * @param add whether to add or remove a flower
   * @returns the updated flower positions and rotations for both side and top down perspectives.
   */
  updateFlower(add: boolean = true, flowerSrc: FlowerSource): Flowers {
    if ((add && this.totalFlowers > 100) || (!add && this.totalFlowers < 1)) {
      console.log("Max/Min flowers reached");
      return this.flowers;
    }

    if (add) {
      this.totalFlowers++;
      this.flowers.flowerSrcs.push(flowerSrc);
    } else {
      this.totalFlowers--;
      this.flowers.flowerSrcs.pop();
    }
    if (
      this.placement.curLayer < 3 &&
      this.flowers.fromSide.length == this.flowers.topDown.length
    ) {
      this.calculateSidePositions(add);
      if (this.placement.curLayer === 3) {
        this.calculateSidePositions(!add);
      }
    }
    this.calculateTopDown(add);
    return { ...this.flowers };
  }
}
