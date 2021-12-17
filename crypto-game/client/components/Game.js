import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCoins } from "../store";
import kaboom from "kaboom";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cash: 0,
    };
    this.updateCash = this.updateCash.bind(this);
    this.initGame = this.initGame.bind(this);
  }

  initGame() {
    const { products, character, assets } = this.props;
    kaboom({
      width: 1000,
      height: 562.5,
      canvas: document.querySelector("#platformer"),
      // font: "sinko",
    });

    // load assets
    // assets.forEach((asset) => {
    //   console.log(asset.name)
    //   loadSprite(asset.name, `/spritesPixelAdventure/assets/${asset.image}`)}
    // );

    // load custom sprites

    loadSprite("prize", "/spritesPixelAdventure/assets/jumpy.png");
    loadSprite("nightsky", "/spritesPixelAdventure/assets/nightsky.png");
    loadSprite(
      "grassAndDirt",
      "/spritesPixelAdventure/assets/grassAndDirt.png"
    );
    loadSprite("spikeTrap", "/spritesPixelAdventure/assets/spikeTrap.png");
    loadSprite(
      "floatingBlock",
      "/spritesPixelAdventure/assets/floatingBlock.png"
    );
    loadSprite("brickBlock", "/spritesPixelAdventure/assets/brickBlock.png");
    loadSprite("black", "/spritesPixelAdventure/assets/black.png");

    // load character Sprite Atlas
    loadSpriteAtlas(
      `/spritesPixelAdventure/characters/sheets/${character.spriteSheet}`,
      {
        userCharacter: {
          x: 0,
          y: 0,
          width: 768,
          height: 32,
          sliceX: 24,
          anims: {
            idle: {
              from: 0,
              to: 10,
              speed: 30,
              loop: true,
            },
            run: {
              from: 11,
              to: 22,
              speed: 30,
              loop: true,
            },
            jump: 23,
          },
        },
      }
    );

    loadSpriteAtlas("/spritesPixelAdventure/assets/Checkpoint_FlagOut.png", {
      checkpoint: {
        x: 0,
        y: 0,
        width: 1664,
        height: 64,
        sliceX: 26,
        anims: {
          waving: {
            from: 0,
            to: 25,
            speed: 30,
            loop: true,
          },
        },
      },
    });

    loadSpriteAtlas("/spritesPixelAdventure/assets/bouncingApple.png", {
      bouncingApple: {
        x: 0,
        y: 0,
        width: 544,
        height: 32,
        sliceX: 17,
        anims: {
          bounce: {
            from: 0,
            to: 16,
            speed: 30,
            loop: true,
          },
        },
      },
    });

    loadSpriteAtlas("/spritesPixelAdventure/assets/rotatingCoin.png", {
      rotatingCoin: {
        x: 0,
        y: 0,
        width: 300,
        height: 50,
        sliceX: 6,
        anims: {
          spin: {
            from: 0,
            to: 5,
            speed: 15,
            loop: true,
          },
        },
      },
    });

    loadSpriteAtlas("/spritesPixelAdventure/assets/enemyRadish.png", {
      enemyRadish: {
        x: 0,
        y: 0,
        width: 180,
        height: 38,
        sliceX: 6,
        anims: {
          idle: {
            from: 0,
            to: 5,
            speed: 10,
            loop: true,
          },
        },
      },
    });

    // sounds
    loadSound("coin", "/sounds/score.mp3");
    loadSound("powerup", "/sounds/powerup.mp3");
    loadSound("blip", "/sounds/blip.mp3");
    loadSound("hit", "/sounds/hit.mp3");
    loadSound("portal", "/sounds/portal.mp3");
    // loadSound(
    //   "takeOnMe",
    //   "/sounds/take_on_me_chiptune_a_ha_-3218709482115074402.mp3"
    // );

    // Seemingly plays without permission
    // const takeOnMe = play("takeOnMe", {
    //   volume: 0.2,
    //   seek: 20,
    // });

    // custom component controlling enemy patrol movement
    function patrol(speed = 60, dir = 1) {
      return {
        id: "patrol",
        require: ["pos", "area"],
        add() {
          this.on("collide", (obj, col) => {
            if (col.isLeft() || col.isRight()) {
              dir = -dir;
            }
          });
        },
        update() {
          this.move(speed * dir, 0);
        },
      };
    }

    // custom component that makes stuff grow big
    function big() {
      let timer = 0;
      let isBig = false;
      let destScale = 1;
      return {
        // component id / name
        id: "big",
        // it requires the scale component
        require: ["scale"],
        // this runs every frame
        update() {
          if (isBig) {
            timer -= dt();
            if (timer <= 0) {
              this.smallify();
            }
          }
          this.scale = this.scale.lerp(vec2(destScale), dt() * 6);
        },
        // custom methods
        isBig() {
          return isBig;
        },
        smallify() {
          destScale = 1;
          timer = 0;
          isBig = false;
        },
        biggify(time) {
          destScale = 2;
          timer = time;
          isBig = true;
        },
      };
    }

    // define some constants
    const JUMP_FORCE = 1320;
    const MOVE_SPEED = 480;
    const FALL_DEATH = 2400;

    const LEVELS = [
      [
        "           HHHHHHHHHHHHHH  ",
        "                  HHHHHHH  ",
        "                @ HH>HHHH  ",
        "  $        HHHHHHHHHHHHHH  ",
        " $$$    HHHHHHHHHHHHHHHHH  ",
        " $ ======================  ",
        " $                         ",
        " $                         ",
        " $                         ",
        " $                         ",
        "                           ",
        "                           ",
        "  =                        ",
        "=>= $$$   $$$   $$$        ",
        "===                        ",
        "                           ",
        "    =^  >  ^  >  ^         ",
        "    ===============        ",
        "                           ",
        "                           ",
        "                           ",
        "        $$$         =      ",
        "        $$$        >=      ",
        "        $ $        =       ",
        "                   =       ",
        "=                 =        ",
        "=   > =     =^^   =        ",
        "=======^^^^^=======        ",
        "       =====               ",
        "                           ",
        "                           ",
      ],
      [
        "     $     --              ",
        "    $                      ",
        "   $$$                     ",
        "   $  $            $       ",
        "  ->- $            -$      ",
        "   -  $             -$     ",
        "     $               -$    ",
        "     $                -    ",
        "     $                 -   ",
        "     $      -           -  ",
        "     $                  >-$",
        "    ->-    ^    -       - $",
        "     -     -          >-  $",
        "                      -   $",
        "            $$      >-    $",
        " ^          --      -     $",
        " -^               >-  @ $$$",
        "  -^      $$      ---------",
        "   -^     --    >-         ",
        "    -^          -          ",
        "     -^       >-           ",
        "      -       -            ",
        "       -     -             ",
        "        -   -              ",
        "                           ",
        "                           ",
        "                           ",
        "===============            ",
        "                           ",
        "                           ",
        "                           ",
      ],
      [
        "                         ",
        "  =$                       ",
        "  ==      =                ",
        "  =                        ",
        "  =            =           ",
        "  =$                 @     ",
        "  ==                 =     ",
        "  =                        ",
        "  =                        ",
        "  =$                       ",
        "  ==                       ",
        "                           ",
        "          $$$     =    $   ",
        "     = > $===$$$$>==       ",
        "      ====   =========     ",
        "                           ",
        "                    $      ",
        "                          =",
        "                           ",
        "                           ",
        "                 $  ^  $   ",
        "                 =  =  =   ",
        "         >  =              ",
        "        ====               ",
        "                           ",
        "                           ",
        "  $$$                      ",
        "=====                      ",
        "                           ",
        "                           ",
        "                           ",
      ],
    ];

    // define what each symbol means in the level graph
    const levelConf = {
      // grid size
      width: 64,
      height: 64,
      // define each object as a list of components
      "=": () => [sprite("grassAndDirt"), area(), solid(), origin("bot")],
      "-": () => [sprite("floatingBlock"), area(), solid(), origin("bot")],
      H: () => [sprite("brickBlock"), area(), solid(), origin("bot")],

      $: () => [
        sprite("rotatingCoin", { anim: "spin" }),
        area(),
        pos(0, -9),
        origin("bot"),
        scale(),
        "rotatingCoin",
      ],
      "%": () => [sprite("prize"), area(), solid(), origin("bot"), "prize"],
      "^": () => [
        sprite("spikeTrap"),
        area(),
        solid(),
        origin("bot"),
        "danger",
      ],
      "#": () => [
        sprite("bouncingApple", { anim: "bounce" }),
        area(),
        scale(3.0),
        origin("bot"),
        body(),
        "bouncingApple",
      ],
      ">": () => [
        sprite("enemyRadish", { anim: "idle" }),
        area(),
        scale(2.0),
        origin("bot"),
        body(),
        patrol(),
        "enemy",
      ],
      "@": () => [
        sprite("checkpoint", { anim: "waving" }),
        area({ scale: 0.5 }),
        origin("bot"),
        pos(0, -12),
        "checkpoint",
      ],
    };

    scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {
      gravity(3200);
      camScale(0.8, 0.8);
      volume(0.07);

      // add level to scene
      const level = addLevel(LEVELS[levelId ?? 0], levelConf);

      add([sprite("nightsky"), fixed(), pos(0, 0), scale(2), z(-2)]);

      // define player object
      const player = add([
        sprite("userCharacter", { anim: "idle" }), // character
        pos(5, 1200),
        area(),
        scale(2.0),
        // makes it fall to gravity and jumpable
        body(),
        // the custom component we defined above
        origin("bot"),
      ]);

      // action() runs every frame
      player.onUpdate(() => {
        // center camera to player
        camPos(player.pos);
        // check fall death
        if (player.pos.y >= FALL_DEATH) {
          go("lose");
        }
      });

      // if player onCollide with any obj with "danger" tag, lose
      player.onCollide("danger", () => {
        go("lose");
        play("hit");
      });

      player.onCollide("checkpoint", () => {
        play("portal");
        if (levelId + 1 < LEVELS.length) {
          go("game", {
            levelId: levelId + 1,
            coins: coins,
          });
        } else {
          go("win");
        }
      });

      player.onGround((l) => {
        if (!isKeyDown("left") && !isKeyDown("right")) {
          player.play("idle");
        } else {
          player.play("run");
        }
        if (l.is("enemy")) {
          shake(3);
          player.jump(JUMP_FORCE * 1.5);
          destroy(l);
          addKaboom(player.pos);
          play("powerup");
        }
      });

      player.onCollide("enemy", (e, col) => {
        // if it's not from the top, die
        if (!col.isBottom()) {
          go("lose");
          play("hit");
        }
      });

      let hasApple = false;

      // grow an apple if player's head bumps into an obj with "prize" tag
      player.onHeadbutt((obj) => {
        if (obj.is("prize") && !hasApple) {
          const bouncingApple = level.spawn("#", obj.gridPos.sub(0, 1));
          bouncingApple.jump();
          hasApple = true;
          play("blip");
        }
      });

      // player grows big onCollide with an "apple" obj
      player.onCollide("bouncingApple", (a) => {
        destroy(a);
        // as we defined in the big() component
        player.biggify(3);
        hasApple = false;
        play("powerup");
      });

      let coinPitch = 0;

      // Lowers the coin pitch sound effect over time, no need to reduce the pitch amount
      onUpdate(() => {
        if (coinPitch > 0) {
          coinPitch = Math.max(0, coinPitch - dt() * 100);
        }
      });

      player.onCollide("rotatingCoin", (c) => {
        destroy(c);
        play("coin", {
          detune: coinPitch,
        });
        coinPitch += 100;
        coins += 1;
        coinsLabel.text = coins;
        this.updateCash(coins);
      });

      const coinsLabel = add([text(coins), pos(24, 24), fixed()]);

      // jump with space
      onKeyPress("space", () => {
        // these 2 functions are provided by body() component
        if (player.isGrounded()) {
          player.jump(JUMP_FORCE);
          player.play("jump");
        }
      });

      onKeyRelease(["left", "right", "up", "down"], () => {
        if (
          !isKeyDown("left") &&
          !isKeyDown("right") &&
          !isKeyDown("up") &&
          !isKeyDown("down")
        ) {
          player.play("idle");
        }
      });

      onKeyDown("left", () => {
        player.move(-MOVE_SPEED, 0);
        player.flipX(true);
        if (player.isGrounded() && player.curAnim() !== "run") {
          player.play("run");
        }
      });

      onKeyDown("right", () => {
        player.move(MOVE_SPEED, 0);
        player.flipX(false);
        if (player.isGrounded() && player.curAnim() !== "run") {
          player.play("run");
        }
      });

      onKeyDown("up", () => {
        go("win");
      });

      onKeyPress("down", () => {
        // takeOnMe.stop();
        // takeOnMe.play();
        player.weight = 3;
      });

      onKeyRelease("down", () => {
        player.weight = 1;
      });

      onKeyPress("f", () => {
        fullscreen(!fullscreen());
      });
    });

    scene("lose", () => {
      // takeOnMe.stop();
      shake(60);
      add([text("You lose!")]);
      add([text("Press any key to play again."), pos(0, 70)]);

      add([sprite("black"), pos(-150, -150), scale(15), z(-2)]);
      this.updateCash(0);
      onKeyPress(() => go("game"));
    });

    scene("win", () => {
      const { auth, updateCoins } = this.props;
      const { cash } = this.state;
      add([text(`You win ${cash} ${cash === 1 ? `coin!` : `coins!`}`)]);
      add([text("Go to your account page"), pos(0, 70)]);
      add([text("to convert them into"), pos(0, 140)]);
      add([text("Hodl Coins!"), pos(0, 210)]);
      add([sprite("nightsky"), scale(6), pos(-490, -600), z(-2)]);
      auth.coins = auth.coins + cash;
      updateCoins(auth);
      this.setState({ cash: 0 });
      onKeyPress(() => go("game"));
    });

    go("game");
  }

  updateCash(newCash) {
    this.setState({ cash: newCash });
  }

  componentDidUpdate(prevProps) {
    const { products } = this.props;
    if (!prevProps.products.length && products.length) {
      this.initGame();
    }
  }

  componentDidMount() {
    const { products } = this.props;
    if (products.length) {
      this.initGame();
    }
  }
  render() {
    return (
      // TODO Fix width and height rescritions to be dependent on kaboom call
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // width: "1280px",
          // height: "720px",
        }}
      >
        {this.state.cash === 0
          ? "You have no coins!"
          : `Win to have ${this.state.cash} ${
              this.state.cash === 1 ? "coin" : "coins"
            } added to your account!`}
        <canvas
          id="platformer"
          style={{ width: "1000px", height: "562.5px" }}
        ></canvas>
      </div>
    );
  }
}

// TODO: Remove any excess
const mapState = (state) => {
  return {
    auth: state.auth,
    products: state.products,
    assets: state.assets,
    character: state.character,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateCoins: (coins) => dispatch(updateCoins(coins)),
  };
};

export default connect(mapState, mapDispatch)(Game);
