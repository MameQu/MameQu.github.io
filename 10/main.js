const cubism4Model =
    "model1/gag1.model3.json";

const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    resizeTo: window,
    background: 0x202020,
});
(async function main() {

    const model4 = await PIXI.live2d.Live2DModel.from(cubism4Model);

    app.stage.addChild(model4);

    model4.scale.set(0.25);
    model4.x = 300;

    let start = performance.now();
    
    app.ticker.add(() => {
        const t = (performance.now() - start) / 1000;

        const breath = Math.sin(t * 2.0);
        const blink = Math.max(0, Math.sin(t * 4.0));
        const hair = Math.sin(t * 3.5) * 0.2;

        const core = model.internalModel.coreModel;
        core.setParameterValueById("ParamBreath", breath);
        core.setParameterValueById("blink", blink);
        core.setParameterValueById("hair", hair);

        model4.internalModel.update();
    });
})();
