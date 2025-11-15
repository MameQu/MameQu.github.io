const cubism4Model =
    "model/gag0.model3.json";


(async function main() {
    const app = new PIXI.Application({
        view: document.getElementById("canvas"),
        autoStart: true,
        resizeTo: window
    });

    PIXI.live2d.Live2DModel.from("cubism4Model").then(model => {
        app.stage.addChild(model);

        model.scale.set(0.5);
        model.position.set(window.innerWidth / 2, window.innerHeight / 2);

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

            model.internalModel.update();
        });
    });

})();