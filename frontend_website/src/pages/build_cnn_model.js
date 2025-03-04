const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');
const { Image } = require('canvas');

// Dataset Path (Update this if needed)
const DATASET_PATH = "C:\\Users\\campb\\Documents\\visual studio code\\projects\\uni_work_projects\\4th_Year\\Honours_Project_folder\\Honours_Project_code\\Backend_Website\\Extra_cnn_model_files\\bird_images_dataset\\withBackground";

// Model Training Configuration
const IMAGE_SIZE = 224;  // Resize images to 224x224
const NUM_CLASSES = 20;  // Number of bird species
const BATCH_SIZE = 16;
const EPOCHS = 20;

// Function to load images and labels
function loadImages(datasetPath) {
    const classFolders = fs.readdirSync(datasetPath);
    const images = [];
    const labels = [];

    classFolders.forEach((classFolder, classIndex) => {
        const classPath = path.join(datasetPath, classFolder);
        const imageFiles = fs.readdirSync(classPath);

        imageFiles.forEach((file) => {
            const imgPath = path.join(classPath, file);
            const imgBuffer = fs.readFileSync(imgPath);
            
            try {
                const imgTensor = tf.node.decodeImage(imgBuffer, 3)
                    .resizeBilinear([IMAGE_SIZE, IMAGE_SIZE])
                    .toFloat()
                    .div(tf.scalar(255.0)); // Normalize

                images.push(imgTensor);
                labels.push(classIndex);
            } catch (error) {
                console.error(`Error processing image: ${imgPath}`, error);
            }
        });
    });

    return { 
        images: tf.stack(images), 
        labels: tf.tensor1d(labels, 'int32') 
    };
}

// Function to create a CNN model
function createModel() {
    const model = tf.sequential();

    model.add(tf.layers.conv2d({
        inputShape: [IMAGE_SIZE, IMAGE_SIZE, 3],
        filters: 32,
        kernelSize: 3,
        activation: 'relu'
    }));
    model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));

    model.add(tf.layers.conv2d({
        filters: 64,
        kernelSize: 3,
        activation: 'relu'
    }));
    model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));

    model.add(tf.layers.flatten());

    model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
    model.add(tf.layers.dropout({ rate: 0.5 }));
    model.add(tf.layers.dense({ units: NUM_CLASSES, activation: 'softmax' }));

    model.compile({
        optimizer: tf.train.adam(),
        loss: 'sparseCategoricalCrossentropy',
        metrics: ['accuracy']
    });

    return model;
}

// Train and save the model
async function trainModel() {
    console.log("Loading dataset...");
    const { images, labels } = loadImages(DATASET_PATH);
    
    console.log("Dataset loaded successfully.");
    console.log("Building CNN model...");
    const model = createModel();

    console.log("Training started...");
    await model.fit(images, labels, {
        batchSize: BATCH_SIZE,
        epochs: EPOCHS,
        validationSplit: 0.2,
        callbacks: tf.node.tensorBoard('./logs')
    });

    await model.save('file://./bird_classifier_model');
    console.log('Model training complete! Model saved at ./bird_classifier_model');
}

// Run training
trainModel().catch(console.error);

