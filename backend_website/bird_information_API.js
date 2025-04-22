const mongoose = require("mongoose");
const Bird = require("./models/birdModel"); // Import Bird model

// Connect to MongoDB
mongoose.connect("mongodb+srv://campbellh2711:ujU9FFBg2JkgUZBl@honourscluster01.34r9i.mongodb.net/?retryWrites=true&w=majority&appName=honoursCluster01", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Array of bird data to preload
const birds = [
  {
    species: "Blackbird",
    scientificName: "Turdus merula",
    imageUrl: "https://th.bing.com/th/id/OIP._Y4qefyPYJipmyU-A4Cr_AHaE6?w=256&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
    identification: "The Blackbird is recognizable by the male’s glossy black plumage, bright yellow eye-ring and beak, while females are more brownish. Listen for its rich, melodious song. (Source: RSPB)",
    //Distribution
    Distribution: "One of our commonest birds, Blackbirds can be seen all year-round. Most are resident, though some do move south in the winter. However, the UK population increases significantly each autumn as huge numbers from northern Europe join ‘our’ birds, to spend the relatively milder winter months here.  (Source: RSPB)",
    image_url_distribution: "https://base-prod.rspb-prod.magnolia-platform.com/dam/jcr:1163a7df-c08a-4ec3-ac16-ce8f098a7e36/blackbird_distributionmap.jpg",  
    // Add more bird key information here
    beakColor: ["Brown", "Yellow", "Black", "Orange"],
    conservationStatus: "Not assessed",
    diet: "Blackbird food consists of a variety of insects and worms, but they also eat berries and fruit when in season.",
    featherColors: ["Brown", "Black", "White"],
    legColor: "Brown",
    length: "24-25cm",
    habitats: ["Woodland", "Urban and Suburban", "Farmland", "Grassland"],
    ukBreedingBirds: "5,100,000 pairs",
    ukWintering: "10-15 million birds",
    weight: "80-100g",
    wingspan: "34-38.5cm"
  },
  {
    species: "Blue Tit",
    scientificName: "Cyanistes caeruleus",
    imageUrl: "https://scottishwildlifetrust.org.uk/wp-content/uploads/2020/02/wildlifetrusts_48763522542-e1581604334974.jpg",
    identification: "This small, lively bird features a striking blue cap, white cheeks, and a yellow belly. Its agile movements and presence at feeders make it easy to spot. (Source: RSPB)",
    beakColor: ["Black"],
    conservationStatus: "Not assessed",
    diet: "Insects, caterpillars, seeds, and nuts.",
    europeanPopulation: "20-44 million pairs",
    featherColors: ["Grey", "Green", "Blue", "Black", "White", "Yellow"],
    legColor: "Grey, Blue",
    length: "12cm",
    habitats: ["Woodland", "Urban and Suburban", "Farmland"],
    ukBreedingBirds: "3,600,000 territories",
    ukWintering: "15 million birds",
    weight: "11g",
    wingspan: "18cm"
  },
  {
    species: "Carrion Crow",
    scientificName: "Corvus corone",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:c362cdfb-f501-4204-98fe-e2cffdb938f0/2180619-Species-Carrion-crow-perched-on-fence-post.jpg",
    identification: "Carrion Crows are entirely black with a robust build and a strong bill. They are typically seen in open countryside or urban settings and are known for their intelligent behavior. (Source: RSPB)",
    beakColor: ["Black"],
    conservationStatus: "Not assessed",
    diet: "Carrion, insects, worms, seeds, fruit, eggs, and any scraps.",
    featherColors: ["Black"],
    legColor: "Black",
    length: "45-47cm",
    habitats: ["Woodland", "Upland", "Urban and Suburban", "Farmland", "Heathland", "Wetland", "Grassland"],
    ukBreedingBirds: "1,000,000 territories",
    weight: "370-650g",
    wingspan: "93-104cm"
  },
  {
    species: "Chaffinch",
    scientificName: "Fringilla coelebs",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:84326b5d-ac35-40ee-8a4a-ace6dd60657f/2115151343-Species-Chaffinch-FEMALE-on-branch.jpg",
    identification: "The Chaffinch is a colorful songbird, with males boasting a blue-grey cap, reddish underparts, and distinctive white wing bars. Females have more muted tones. It is one of the most widespread birds in the UK. (Source: RSPB)",
    beakColor: ["Brown", "Black", "Blue"],
    conservationStatus: "Not assessed",
    diet: "Insects and seeds.",
    legColor: ["Pink", "Brown"],
    length: "14.5cm",
    habitats: ["Woodland", "Urban and Suburban", "Farmland", "Heathland", "Grassland"],
    ukBreedingBirds: "6.2 million (plus 2 million in Ireland)",
    weight: "18-29g",
    wingspan: "24.5-28.5cm"
  },
  {
    species: "Coal Tit",
    scientificName: "Periparus ater",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:daf3844d-1773-4a7a-b262-c3b483274d95/Species-Coal%20Tit-BGBW.jpg",
    identification: "Small and active, the Coal Tit has a distinctive black cap with white cheeks. Its quick movements in woodlands make it a delightful find for birdwatchers. (Source: RSPB)",
    beakColor: ["Black"],
    conservationStatus: "Not assessed",
    diet: "Insects, seeds, and nuts.",
    featherColors: ["Cream/Buff", "Brown", "Grey", "Black", "White", "Yellow"],
    legColor: "Grey",
    length: "11.5cm",
    habitats: ["Woodland", "Urban and Suburban", "Heathland"],
    ukBreedingBirds: "680,000 territories",
    weight: "8-10g",
    wingspan: "17-21cm"
  },
  {
    species: "Collared Dove",
    scientificName: "Streptopelia decaocto",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:5ef8ce97-f6cb-48b8-a5e0-08ce3deff9d2/Species-Collared%20Dove-BGBW.jpg",
    identification: "Easily identified by the subtle black ‘collar’ around its nape and soft cooing calls, the Collared Dove is a common visitor to gardens and urban areas. (Source: RSPB)",
    beakColor: ["Black"],
    conservationStatus: "Not assessed",
    diet: "Seeds, grains, buds, and shoots.",
    featherColors: ["Cream/Buff", "Brown", "Grey", "Pink/Purple", "Black", "White"],
    legColor: ["Pink", "Brown", "Red"],
    length: "32cm",
    habitats: ["Urban and Suburban", "Farmland"],
    ukBreedingBirds: "810,000 pairs",
    weight: "200g",
    wingspan: "51cm"
  },  
  {
    species: "Dunnock",
    scientificName: "Prunella modularis",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:1f0fe525-3c55-4dbc-874d-c20556123f1d/Species-Dunnock-BGBW.jpg",
    identification: "The Dunnock, often known as the hedge sparrow, is a small, unobtrusive bird with a brown and grey plumage. It has a thin, pointed black beak and pinkish legs. Dunnocks are often seen skulking near hedges and shrubs, flicking their wings nervously.",
    beakColor: ["Black"],
    conservationStatus: "Not assessed",
    diet: "Insects, spiders, worms, and seeds.",
    featherColors: ["Brown", "Grey", "Black"],
    legColor: ["Pink", "Brown"],
    length: "14cm",
    habitats: ["Woodland", "Urban and Suburban", "Farmland", "Grassland"],
    ukBreedingBirds: "2,300,000 territories",
    weight: "19-24g",
    wingspan: "19-21cm"
  },
  {
    species: "Rock Dove/Feral Pigeon",
    scientificName: "Columba livia",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:ad793298-36a7-4164-a274-d36b87cb4a7c/2186817633-Species-Rock-dove-feral-pigeon-walking-on-rock.jpg",
    identification: "The Rock Dove is the wild ancestor of domestic pigeons worldwide. Feral Pigeons display a variety of plumage shades, from pale grey with darker checked markings to unusual brick-red or cinnamon-brown hues. They are commonly found in urban areas.",
    beakColor: ["Black"],
    conservationStatus: "Not assessed",
    diet: "Seeds and cereals.",
    featherColors: ["Cream/Buff", "Brown", "Grey", "Pink/Purple", "Blue", "Black", "White"],
    legColor: ["Pink", "Brown", "Red"],
    length: "31-34cm",
    habitats: ["Urban and Suburban", "Marine and Intertidal", "Farmland"],
    ukBreedingBirds: "465,000 pairs",
    weight: "230-370g",
    wingspan: "63-70cm"
  },  
  {
    species: "Goldfinch",
    scientificName: "Carduelis carduelis",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:b6206427-1294-4fd5-9802-8a60da4166e1/____________1719550366-Species-goldfinch-on-branch-yellow-leaves.12231457836407822748.4102416274174699093.798384376815356056.13721152601242114202.jpg",
    identification: "The Goldfinch is a colorful finch with a bright red face and yellow wing patch. It's a very sociable bird, often breeding in loose groups. It has a delightful twittering song and call.",
    beakColor: ["Brown", "Black", "Red"],
    conservationStatus: "Not assessed",
    diet: "Seeds and insects in summer.",
    featherColors: ["Cream/Buff", "Brown", "Red", "Black", "White", "Yellow"],
    legColor: ["Pink", "Brown"],
    length: "12cm",
    habitats: ["Urban and Suburban", "Farmland"],
    ukBreedingBirds: "1.2 million pairs",
    weight: "14-19g",
    wingspan: "21-25.5cm"
  },  
  {
    species: "Great Tit",
    scientificName: "Parus major",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:ab42344e-92b8-4afc-8a58-0ffbc2c9428a/1555509032-Species-Great-tit-ADULT-perched-on-moss-covered-branch.jpg",
    identification: "The Great Tit is the largest UK tit, recognizable by its black head and white cheeks. It has a distinctive two-syllable song and is commonly found in woodlands, gardens, and parks.",
    beakColor: ["Black"],
    conservationStatus: "Not assessed",
    diet: "Insects, seeds, and nuts.",
    featherColors: ["Cream/Buff", "Grey", "Green", "Blue", "Black", "White", "Yellow"],
    legColor: ["Grey"],
    length: "14cm",
    habitats: ["Woodland", "Urban and Suburban", "Farmland"],
    ukBreedingBirds: "2,500,000 territories",
    weight: "18g",
    wingspan: "24cm"
  },
  {
    species: "Greenfinch",
    scientificName: "Chloris chloris",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:28393eeb-349e-4d6c-b602-ed23f04c1ce9/Species-Greenfinch-BGBW.jpg",
    identification: "The Greenfinch is a stocky songbird with a distinctive green and yellow plumage. Males are brighter with more vivid coloring, while females and juveniles are duller. They have a robust conical bill suited for their seed-based diet.",
    beakColor: ["Brown", "Black"],
    conservationStatus: "Not assessed",
    diet: "Seeds and insects.",
    featherColors: ["Cream/Buff", "Brown", "Grey", "Green", "Black", "White", "Yellow"],
    legColor: ["Pink", "Brown"],
    length: "15cm",
    habitats: ["Woodland", "Urban and Suburban", "Farmland"],
    ukBreedingBirds: "1,700,000 pairs",
    weight: "28g",
    wingspan: "26cm"
  },  
  {
    species: "House Sparrow",
    scientificName: "Passer domesticus",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:815e33a6-4992-4401-b372-84f434164a8b/1713630676-Species-House-Sparrow-stood-on-lichen-log%20(1).jpg",
    identification: "The House Sparrow is a small, stocky bird with a stout bill. Males have distinctive grey heads, white cheeks, a black bib, and rufous neck, while females and juveniles are pale brown with darker streaks on their backs.",
    beakColor: ["Brown", "Black"],
    conservationStatus: "Not assessed",
    diet: "Seeds and scraps.",
    featherColors: ["Brown", "Grey", "Black", "White"],
    legColor: ["Pink", "Brown"],
    length: "14-15cm",
    habitats: ["Urban and Suburban", "Farmland"],
    ukBreedingBirds: "5,300,000 pairs",
    weight: "24-38g",
    wingspan: "21-25.5cm"
  },
  {
    species: "Jackdaw",
    scientificName: "Coloeus monedula",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:09f2587f-a0c3-4583-bdb4-d199a152a569/1261265839-Species-Jackdaw-on-branch-looking-to-side_1.jpg",
    identification: "The Jackdaw is a small black crow with a distinctive silvery sheen on the back of its head and pale eyes. It's a sociable bird, often seen in pairs or groups, and is known for its inquisitive nature.",
    beakColor: ["Black"],
    conservationStatus: "Not assessed",
    diet: "Insects, young birds and eggs, fruit, seeds, and scraps.",
    featherColors: ["Grey", "Black"],
    legColor: ["Black"],
    length: "34 cm",
    habitats: ["Woodland", "Upland", "Urban and Suburban", "Farmland", "Grassland"],
    ukBreedingBirds: "1,400,000 pairs",
    weight: "220 g",
    wingspan: "70 cm"
  },
  {
    species: "Long-tailed Tit",
    scientificName: "Aegithalos caudatus",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:3af85219-0c89-4797-a878-1af47403c740/1417623404-Species-Long-Tailed-Tit-JUVENILE-perched-on-branch.jpg",
    identification: "This charming bird is noted for its disproportionately long, fluffy tail and small, rounded body. Its soft grey plumage and delicate features make it a favorite among bird enthusiasts. (Source: RSPB)",
    beakColor: ["Black"],
    conservationStatus: "Not assessed",
    diet: "Insects, occasionally seeds in autumn and winter.",
    featherColors: ["Cream/Buff", "Brown", "Pink/Purple", "Black", "White"],
    legColor: ["Brown"],
    length: "14cm",
    habitats: ["Woodland", "Urban and Suburban", "Farmland", "Heathland"],
    ukBreedingBirds: "340,000 territories",
    weight: "7-10g",
    wingspan: "16-19cm"
  },  
  {
    species: "Magpie",
    scientificName: "Pica pica",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:654b3e61-1f98-4ab1-827a-6bc321517942/___1850229250-Species-magpie-stood-on-branch_1.14086855069194369589.jpg",
    identification: "Magpies are striking with their black and white plumage and long, graduated tail. Their intelligent behavior and varied vocalizations set them apart in both urban and rural areas. (Source: RSPB)",
    beakColor: ["Black"],
    conservationStatus: "Not assessed",
    diet: "Omnivore and scavenger.",
    featherColors: ["Green", "Blue", "Black", "White"],
    legColor: ["Black"],
    length: "44-46cm",
    habitats: ["Woodland", "Upland", "Urban and Suburban", "Farmland", "Heathland", "Wetland", "Grassland"],
    ukBreedingBirds: "600,000 territories",
    weight: "200-250g",
    wingspan: "52-60cm"
  },  
  {
    species: "Robin",
    scientificName: "Erithacus rubecula",
    imageUrl: "https://c02.purpledshub.com/uploads/sites/62/2014/12/GettyImages-511380252-08b8a2e.jpg?fit=1024%2C1024",
    identification: "Easily recognized by its vivid red breast and soft brown upperparts, the Robin is a beloved garden bird with a distinctive upright posture and a melodious song. (Source: RSPB)",
    beakColor: ["Black"],
    conservationStatus: "Not assessed",
    diet: "Worms, seeds, fruits, insects and other invertebrates.",
    featherColors: ["Cream/Buff", "Brown", "Grey", "Orange", "Red", "White", "Yellow"],
    legColor: ["Pink", "Brown"],
    length: "14cm",
    habitats: ["Woodland", "Urban and Suburban", "Farmland"],
    ukBreedingBirds: "6,700,000 territories",
    weight: "14-21g",
    wingspan: "20-22cm"
  },  
  {
    species: "Song Thrush",
    scientificName: "Turdus philomelos",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:89863ca9-3c99-4e8c-ab11-e7d038f63294/1072624-Species-Song-Thrush-perched-on-branch.jpg",
    identification: "The Song Thrush is a medium-sized thrush with warm brown upperparts and black-speckled cream underparts. It is well known for its repeated phrases in its song. (Source: RSPB)",
    beakColor: ["Black"],
    conservationStatus: "Not assessed",
    diet: "Worms, snails, fruit.",
    featherColors: ["Cream/Buff", "Brown", "Orange", "Black", "White"],
    legColor: ["Pink", "Brown"],
    length: "23cm",
    habitats: ["Woodland", "Urban and Suburban", "Farmland", "Grassland"],
    ukBreedingBirds: "1,200,000 territories",
    weight: "65-100g",
    wingspan: "33-36cm"
  },  
  {
    species: "Starling",
    scientificName: "Sturnus vulgaris",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:4785c94a-8e46-4a0e-b027-267afe710d9d/Species-Starling-BGBW.jpg",
    identification: "Starlings feature glossy, iridescent black plumage that can show hints of speckling in winter. Their dynamic, murmuration displays and vocal repertoire make them memorable. (Source: RSPB)",
    beakColor: ["Yellow", "Black"],
    conservationStatus: "Not assessed",
    diet: "Invertebrates, fruit.",
    featherColors: ["Cream/Buff", "Brown", "Grey", "Green", "Pink/Purple", "Blue", "Black", "White"],
    legColor: ["Pink", "Brown"],
    length: "21cm",
    habitats: ["Woodland", "Upland", "Urban and Suburban", "Marine and Intertidal", "Farmland", "Wetland", "Grassland"],
    ukBreedingBirds: "1.8 million",
    weight: "75-90g",
    wingspan: "37-42cm"
  },  
  {
    species: "Wood Pigeon",
    scientificName: "Columba palumbus",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:9beed41c-9c82-4c14-972b-011d61345fd9/___1656641140-Species-Woodpigeon-ADULT-Sat-on-branch-in-rain.8223708753546319251.jpg",
    identification: "Wood Pigeons are large, with a soft grey body, a noticeable white patch on the neck, and a pinkish breast. Their gentle cooing and presence in woodlands and parks make them easy to spot. (Source: RSPB)",
    beakColor: ["Brown", "Black", "Orange"],
    conservationStatus: "Not assessed",
    diet: "Crops like cabbages, sprouts, peas, and grain. Also buds, shoots, seeds, nuts, and berries.",
    featherColors: ["Brown", "Grey", "Pink/Purple", "Blue", "Black", "White"],
    legColor: ["Pink", "Brown", "Red"],
    length: "40-42cm",
    habitats: ["Woodland", "Urban and Suburban", "Farmland", "Grassland"],
    ukBreedingBirds: "5,150,000 pairs",
    weight: "480-550g",
    wingspan: "75-80cm"
  },  
  {
    species: "Wren",
    scientificName: "Troglodytes troglodytes",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:1524a416-da2c-4785-9e90-d10eabd8563e/2168197-Species-Wren-on-branch-winter.jpg",
    identification: "Despite their small size, Wrens are bold singers. Their brown plumage, energetic movements, and distinctive upright tail help birdwatchers locate them even in dense undergrowth. (Source: RSPB)",
    beakColor: ["Black"],
    conservationStatus: "Not assessed",
    diet: "Insects and spiders.",
    featherColors: ["Cream/Buff", "Brown", "White"],
    legColor: ["Pink", "Brown"],
    length: "9-10cm",
    habitats: ["Woodland", "Urban and Suburban", "Farmland", "Heathland"],
    ukBreedingBirds: "8,600,000 territories",
    weight: "7-12g",
    wingspan: "13-17cm"
  }
  

];

// Function to preload bird data
const seedDatabase = async () => {
  try {
    await Bird.deleteMany(); // Clear old data
    await Bird.insertMany(birds); // Insert new birds
    console.log("✅ Bird data preloaded successfully!");
    mongoose.connection.close(); // Close connection after seeding
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

seedDatabase();