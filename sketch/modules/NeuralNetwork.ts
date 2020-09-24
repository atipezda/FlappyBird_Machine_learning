///<reference path="../../tensorflow.d.ts"/>

class NeuralNetwork{
    inputNodes: number;
    hiddenNodes: number;
    outputNodes: number;
    model: tf.Sequential;
    constructor(inputs: number, hidden: number, outputs: number, brain: tf.Sequential = undefined) {
        this.inputNodes = inputs;
        this.hiddenNodes = hidden;
        this.outputNodes = outputs;
        if (brain) {
            this.model = brain;
        }else{
            this.model = this.createModel();
        }
    }
    copy(){
        const modelCopy = this.createModel();
        const weights = this.model.getWeights();
        const weightCopies = [];
        for (let i = 0; i < weights.length; i++) {
            weightCopies[i] = weights[i].clone();
        }
        modelCopy.setWeights(weightCopies);
        return new NeuralNetwork(
            this.inputNodes,
            this.hiddenNodes,
            this.outputNodes,
            modelCopy
        );
    }
    mutate(rate: number){
        const weights = this.model.getWeights();
        const mutatedWeights = [];
        for (let i = 0; i < weights.length; i++) {
            let tensor = weights[i];
            let shape = weights[i].shape;
            let values = tensor.dataSync().slice();
            for (let j = 0; j < values.length; j++) {
                if (random(1) < rate) {
                    console.log('MUTATE HERE');
                    let w = values[j];
                    values[j] = w + randomGaussian(0,1);
                }
            }
            mutatedWeights[i] = tf.tensor(values, shape);
        }
        this.model.setWeights(mutatedWeights);
    }

    createModel(){
        const model = tf.sequential()
        const hidden = tf.layers.dense({
            units: this.hiddenNodes,
            inputDim: this.inputNodes,
            activation: 'sigmoid'
        })
        model.add(hidden);
        const output = tf.layers.dense({
            units: this.outputNodes,
            activation: 'softmax'
        })
        model.add(output);
        return model;
    }

    predict(inputs: number[]){
        const xs = tf.tensor2d([inputs]);
        const ys = this.model.predict(xs);
        return ys.dataSync();
    }
}
