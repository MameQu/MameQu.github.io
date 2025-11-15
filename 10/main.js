const cubism4Model =
    "model/gag0.model3.json";

(async function main() {
    const app = new PIXI.Application({
        view: document.getElementById("canvas"),
        autoStart: true,
        resizeTo: window
    });

    const model4 = await PIXI.live2d.Live2DModel.from(cubism4Model);

    app.stage.addChild(model4);

    model4.scale.set(0.25);

    model4.x = 300;
})();
