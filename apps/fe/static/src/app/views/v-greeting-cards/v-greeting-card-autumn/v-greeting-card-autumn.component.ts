import { AfterViewInit, Component } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'personal-v-greeting-card-autumn',
  templateUrl: './v-greeting-card-autumn.component.html',
  styleUrls: ['./v-greeting-card-autumn.component.scss'],
})
export class VGreetingCardAutumnComponent implements AfterViewInit {
  backFallingLeaves = ['.brownLeaf', '.orangeLeaf', '.redLeaf'];
  txtLine1 = '.text-line-1';
  txtLine2 = '.text-line-2';
  txtGreeting = '.text-greeting';
  treeLeaves = '[class^=treeleaf]';
  floorLeaves = '[class^=floorleaf]';
  bird = '.Bird';
  birdHat = '.BirdHat';
  birdEyes = '.leftEye , .rightEye';
  nest = '.NestAndLeaves';
  tree = '.tree_trunk';
  body = '.card';
  ngAfterViewInit(): void {
    this.go();
  }

  go() {
    const masterTl = gsap.timeline();
    masterTl
      .add(this.clearStage(), 'scene-clear-stage')
      .add(this.enterFloorVegetation(), 'scene-floor-vegetation')
      .add(this.enterTreeElements(), 'scene-enter-elements')
      .add(this.enterGreeting(), 'scene-greeting');
  }

  clearStage() {
    const clearTL = gsap.timeline();
    clearTL
      .set(this.backFallingLeaves, { autoAlpha: 0 })
      .set(this.txtLine1, { autoAlpha: 0 })
      .set(this.txtLine2, { autoAlpha: 0 })
      .set(this.txtGreeting, { autoAlpha: 0 })
      .set(this.treeLeaves, { autoAlpha: 0 })
      .set(this.floorLeaves, { y: '+=275' })
      .set(this.bird, { y: '+=65' })
      .set(this.nest, { autoAlpha: 0 })
      .set(this.tree, { autoAlpha: 0 });
    return clearTL;
  }

  enterFloorVegetation() {
    const fleavesTL = gsap.timeline();
    fleavesTL
      .to(this.floorLeaves, { y: 0, ease: 'back.out(1.3)', stagger: 0.01 })
      .fromTo(
        this.tree,
        {
          duration: 1.1,
          scaleY: 0.7,
          autoAlpha: 0,
          transformOrigin: 'center bottom',
        },
        {
          duration: 1.1,
          scaleY: 1,
          autoAlpha: 1,
          ease: 'back.inOut(1)',
          transformOrigin: 'center bottom',
        }
      )
      .fromTo(
        this.tree,
        {
          duration: 0.9,
          scaleX: 0.7,
          autoAlpha: 0,
          transformOrigin: 'center bottom',
        },
        {
          duration: 0.9,
          scaleX: 1,
          autoAlpha: 1,
          ease: 'back.inOut(1)',
          transformOrigin: 'center bottom',
        },
        '-=0.9'
      );
    return fleavesTL;
  }

  enterTreeElements() {
    const treeElementsTL = gsap.timeline();

    treeElementsTL
      .fromTo(
        this.treeLeaves,
        {
          scale: 0,
          autoAlpha: 0,
          ease: 'back.out(1.3)',
          transformOrigin: 'center bottom',
        },
        {
          scale: 1,
          autoAlpha: 1,
          ease: 'back.out(1)',
          stagger: 0.02,
          transformOrigin: 'center bottom',
        }
      )
      .fromTo(
        this.nest,
        {
          y: 0.7,
          scale: 0,
          autoAlpha: 0,
          transformOrigin: 'center center',
        },
        {
          y: '-=15',
          duration: 1,
          scale: 1,
          autoAlpha: 1,
          ease: 'elastic.out(1)',
        },
        '+=0.1'
      )
      .to(this.nest, { y: '+=15', ease: 'bounce.out(1)' }, '-=0.5')
      .add('nest-pop-in')
      .set(this.birdHat, { rotation: 12, x: '+=6' })
      .to(
        this.bird,
        {
          duration: 1.4,
          y: '-=39',
          autoAlpha: 1,
          ease: 'power4.inOut',
        },
        'nest-pop-in+=0.1'
      )
      .add('bird-peaking')
      .set(this.birdEyes, { autoAlpha: 0 })
      .set(this.birdEyes, { autoAlpha: 1 }, '+=0.2')
      .set(this.birdEyes, { autoAlpha: 0 }, '+=0.3')
      .set(this.birdEyes, { autoAlpha: 1 }, '+=0.2')
      .add('bird-blinks')
      .to(this.bird, { y: '-=34', ease: 'power4.inOut', duration: 0.8 })
      .to(this.bird, { y: '+=8', ease: 'back.out', duration: 0.3 })
      .to(this.birdHat, { y: '-=12', duration: 0.4 }, '-=0.6')
      .to(
        this.birdHat,
        {
          y: 0,
          duration: 0.3,
          x: 0,
          rotation: 0,
          onComplete: () => this.startBlinking(),
        },
        '-=0.2'
      );

    return treeElementsTL;
  }

  startBlinking() {
    const birdBlinkTL = gsap.timeline({ repeat: -1, repeatDelay: 5 });

    birdBlinkTL
      .set(this.birdEyes, { autoAlpha: 0 })
      .set(this.birdEyes, { autoAlpha: 1 }, '+=0.2')
      .set(this.birdEyes, { autoAlpha: 0 }, '+=1.2')
      .set(this.birdEyes, { autoAlpha: 1 }, '+=0.2');
  }

  enterGreeting() {
    const enterGreetingTL = gsap.timeline();
    enterGreetingTL
      .fromTo(
        this.txtLine1,
        { y: '-=50', autoAlpha: 0 },
        { y: 0, autoAlpha: 1, onComplete: () => this.startLoops() }
      )
      .fromTo(
        this.txtLine2,
        { y: '-=25', autoAlpha: 0 },
        { y: 0, autoAlpha: 1 }
      )
      .fromTo(
        this.txtGreeting,
        { scale: 2, autoAlpha: 0, transformOrigin: 'center center' },
        {
          scale: 1,
          autoAlpha: 1,
          stagger: 0.2,
          transformOrigin: 'center center',
        },
        0.1
      );
    return enterGreetingTL;
  }

  /**
   * Loop fo falling leaves and background
   */
  startLoops() {
    const colors = ['#edcc93', '#f7e3ae', '#f3ebcc', '#edcc93'];
    const bgLt = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    colors.forEach((color) => {
      bgLt.to(this.body, { backgroundColor: color, duration: 3 });
    });

    this.backFallingLeaves.forEach((leaf) => {
      this.repeatFall(leaf);
    });
  }
  /**
   * Loop fo falling leaves
   * It will randomise leaves position and timeline
   */
  repeatFall(leafId: string) {
    const range = Math.random() * 800;
    const offset = 400;
    const newXPosition = range - offset;
    gsap.set(leafId, {
      x: newXPosition,
      y: -100,
      rotation: Math.random() * 360,
      autoAlpha: 0,
    });
    gsap.to(leafId, {
      duration: 10 + Math.random() * 10,
      y: '+=1200',
      ease: 'none',
      autoAlpha: 1,
      onComplete: () => this.repeatFall(leafId),
    });
  }
}
