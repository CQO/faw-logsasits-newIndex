export function addGif(viewer, url) {
    let canvas = document.createElement("canvas");
    let gifImageLayerList = {};
    let rectangle = Cesium.Rectangle.fromDegrees(...[72.07, 0.67, 158.66, 69.45]);

    function onDrawFrame(ctx, frame) {
        let { data_offset } = frame;

        if (gifImageLayerList[data_offset]) {
            viewer.imageryLayers.raiseToTop(gifImageLayerList[data_offset]);
        } else {
            ctx.canvas.width = frame.width;
            ctx.canvas.height = frame.height;

            ctx.drawImage(frame.buffer, 0, 0);

            const provider = new Cesium.SingleTileImageryProvider({
                url: canvas.toDataURL(),
                rectangle
            });
            let layer = viewer.imageryLayers.addImageryProvider(provider);
            gifImageLayerList[data_offset] = layer;
        }
    }

    gifler(url).frames(canvas, onDrawFrame);

}