import React, { Component } from "react";
import { connect } from "react-redux";
import { addCoinsToAccount } from "../store";
import kaboom from "kaboom";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cash: 0,
    };
    this.updateCash = this.updateCash.bind(this);
  }

  updateCash(newCash) {
    this.setState({ cash: newCash });
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentDidMount() {
    const { cash } = this.state;

    kaboom();
    // camScale((0.5, 0.5));

    // load assets
    loadSprite("bean", "/sprites/bean.png");
    loadSprite("ghosty", "/sprites/ghosty.png");
    loadSprite("spike", "/sprites/spike.png");
    loadSprite("grass", "/sprites/grass.png");
    loadSprite("prize", "/sprites/jumpy.png");
    loadSprite("apple", "/sprites/apple.png");
    loadSprite("portal", "/sprites/portal.png");
    loadSprite("coin", "/sprites/coin.png");
    loadSound("coin", "/sounds/score.mp3");
    loadSound("powerup", "/sounds/powerup.mp3");
    loadSound("blip", "/sounds/blip.mp3");
    loadSound("hit", "/sounds/hit.mp3");
    loadSound("portal", "/sounds/portal.mp3");
    loadSound("takeOnMe", '/sounds/take_on_me_chiptune_a_ha_-3218709482115074402.mp3')

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
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "           $$         =   $",
        "  %      ====         =   $",
        "                      =   $",
        "                      =    ",
        "       ^^      = >    =   @",
        "===========================",
      ],
      [
        "     $    $    $    $     $",
        "     $    $    $    $     $",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "                           ",
        "  ^^^>^^^^>^^^^>^^^^>^^^^ @",
        "===========================",
      ],
    ];

    // define what each symbol means in the level graph
    const levelConf = {
      // grid size
      width: 64,
      height: 64,
      // define each object as a list of components
      "=": () => [sprite("grass"), area(), solid(), origin("bot")],
      $: () => [sprite("coin"), area(), pos(0, -9), origin("bot"), "coin"],
      "%": () => [sprite("prize"), area(), solid(), origin("bot"), "prize"],
      "^": () => [sprite("spike"), area(), solid(), origin("bot"), "danger"],
      "#": () => [sprite("apple"), area(), origin("bot"), body(), "apple"],
      ">": () => [
        sprite("ghosty"),
        area(),
        origin("bot"),
        body(),
        patrol(),
        "enemy",
      ],
      "@": () => [
        sprite("portal"),
        area({ scale: 0.5 }),
        origin("bot"),
        pos(0, -12),
        "portal",
      ],
    };

    scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {
      gravity(3200);

      // add level to scene
      const level = addLevel(LEVELS[levelId ?? 0], levelConf);

      // define player object
      const player = add([
        sprite("bean"),
        pos(0, 0),
        area(),
        scale(1),
        // makes it fall to gravity and jumpable
        body(),
        // the custom component we defined above
        big(),
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

      player.onCollide("portal", () => {
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
        //fullscreen(!isFullscreen())
        if (l.is("enemy")) {
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
          const apple = level.spawn("#", obj.gridPos.sub(0, 1));
          apple.jump();
          hasApple = true;
          play("blip");
          play("takeOnMe")
        }
      });

      // player grows big onCollide with an "apple" obj
      player.onCollide("apple", (a) => {
        destroy(a);
        // as we defined in the big() component
        player.biggify(3);
        hasApple = false;
        play("powerup");
      });

      let coinPitch = 0;

      onUpdate(() => {
        if (coinPitch > 0) {
          coinPitch = Math.max(0, coinPitch - dt() * 100);
        }
      });

      player.onCollide("coin", (c) => {
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
        }
      });

      onKeyDown("left", () => {
        player.move(-MOVE_SPEED, 0);
      });

      onKeyDown("right", () => {
        player.move(MOVE_SPEED, 0);
      });

      onKeyPress("down", () => {
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
      add([text("You Lose")]);
      this.updateCash(0);
      onKeyPress(() => go("game"));
    });

    scene("win", () => {
      const { auth, addCoinsToAccount } = this.props;
      const { cash } = this.state;
      add([text(`You win ${cash} ${cash === 1 ? `coin!` : `coins!`}`)]);
      auth.coins = auth.coins + cash;
      addCoinsToAccount(auth);
      this.setState({ cash: 0 });
      onKeyPress(() => go("game"));
    });

    go("game");
  }
  render() {
    return (
      <div>
        {this.state.cash === 0
          ? "You have no coins!"
          : `Win to have ${this.state.cash} ${
              this.state.cash === 1 ? "coin" : "coins"
            } added to your account!`}
      </div>
    );
  }
}

// TODO: Remove any excess
const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addCoinsToAccount: (coins) => dispatch(addCoinsToAccount(coins)),
  };
};

export default connect(mapState, mapDispatch)(Game);
