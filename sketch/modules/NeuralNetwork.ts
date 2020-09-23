///<reference path="../../tensorflow.d.ts"/>

class NeuralNetwork{
    inputNodes: number;
    hiddenNodes: number;
    outputNodes: number;
    model: tf.Sequential;
    constructor(inputs: number, hidden: number, outputs: number) {
        this.inputNodes = inputs;
        this.hiddenNodes = hidden;
        this.outputNodes = outputs;
        this.createModel();
    }
    copy(){
        const modelCopy = this.createModel();
        const weights = this.model.getWeights();
    }

    createModel(){
        this.model = tf.sequential()
        const hidden = tf.layers.dense({
            units: this.hiddenNodes,
            inputDim: this.inputNodes,
            activation: 'sigmoid'
        })
        this.model.add(hidden);
        const output = tf.layers.dense({
            units: this.outputNodes,
            activation: 'softmax'
        })
        this.model.add(output);
        // this.model.compile();
    }

    predict(inputs: number[]){
        const xs = tf.tensor2d([inputs]);
        const ys = this.model.predict(xs);
        return ys.dataSync();
    }
}
