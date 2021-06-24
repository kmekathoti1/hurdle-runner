class Game {
    constructor() {}

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }


    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form()
            form.display();
        }
        car1 = createSprite(10, 200);
        car1.scale = 1;
        car1.setCollider("rectangle", 0, 0)
        car1.debug = true;
        car1.velocityY = 2;
        car1.addImage("car1", car1_img);
        car2 = createSprite(10, 500);
        car2.scale = 1;
        car2.velocityY = 2;

        car2.setCollider("rectangle", 0, 0);
        car2.debug = true;

        car2.addImage("car2", car2_img);
        cars = [car1, car2];
        invisibleGround1 = createSprite(100, 480, displayWidth * 5, 20);
        invisibleGround1.setCollider("rectangle", 0, 0);
        invisibleGround1.debug = true;
        // invisibleGround1.visible = false;
        invisibleGround2 = createSprite(100, 750, displayWidth * 5, 20);
        invisibleGround2.setCollider("rectangle", 0, 0);
        invisibleGround2.debug = true;


        // invisibleGround2.visible = false;


    }
    play() {
        form.hide();
        Player.getPlayerInfo();
        spawnObstacles();
        spawnObstacles1();



        // Player.getPlayersAtEnd();

        if (allPlayers !== undefined) {
            image(track, 0, -20, displayWidth * 5, displayHeight);

            //index of the array
            var index = 0;
            //x and y position of the cars
            var y = 140;
            var x = 50;


            car1.collide(invisibleGround1);
            car2.collide(invisibleGround2);


            for (var plr in allPlayers) {
                index = index + 1;


                y = y + 260;
                //use data form the database to display the cars in x direction
                x = 360 - allPlayers[plr].distance;

                cars[index - 1].x = x;
                cars[index - 1].y = y;
                cars[index - 1].velocityY = 2;
                cars[index - 1].velocityY = 2;

                if (index === player.index) {
                    // console.log("yes")
                    stroke(10);
                    fill("red");
                    ellipse(x, y, 60, 60);
                    cars[index - 1].shapeColor = "red";
                    camera.position.x = cars[index - 1].x;
                    camera.position.y = cars[index - 1].y;
                    player.x = x;
                    player.y = y;


                    if (keyDown("space")) {
                        // console.log(player.x)
                        cars[index - 1].velocityY = -14;

                    }
                    // player.velocityY = player.velocityY + 0.8



                }





                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
            }

        }







        if (player.distance == -9230) {
            gameState = 2;
            player.rank += 1
            Player.updateCarsAtEnd(player.rank)
        }

        drawSprites();
    }

    end() {
        console.log("Game Ended");
        console.log(player.rank);
    }
}

function spawnObstacles() {
    var i = 0;
    if (frameCount % 360 === 0) {
        i = i + 1000
        var obstacle = createSprite(6000, 325);

        obstacle.velocityX = -2;
        obstacle.addImage(hurdle);

        obstacle.scale = 0.40;
        obstacle.lifetime = 800;
        obstacle.setCollider("rectangle", -10, 0, 90, 150);
        obstacle.debug = true;
    }
}

function spawnObstacles1() {
    if (frameCount % 360 === 0) {

        var obstacle = createSprite(800, 585);

        obstacle.velocityX = -2;
        obstacle.addImage(hurdle);
        obstacle.scale = 0.40;
        obstacle.lifetime = 800;
        obstacle.setCollider("rectangle", -10, 0, 90, 150);
        obstacle.debug = true;

    }
}