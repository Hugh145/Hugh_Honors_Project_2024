const mongoose = require("mongoose");
const Bird = require("./birdModel"); // Import Bird model

// Connect to MongoDB
mongoose.connect("mongodb+srv://campbellh2711:z6sZsNRrN5jfv6my@hughmongodb.0m42p.mongodb.net/HughMongoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Sample bird data to preload
const birds = [
  {
    species: "Blackbird",
    scientificName: "Turdus merula",
    imageUrl: "https://th.bing.com/th/id/OIP._Y4qefyPYJipmyU-A4Cr_AHaE6?w=256&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
    identification: "The Blackbird is recognizable by the male’s glossy black plumage, bright yellow eye-ring and beak, while females are more brownish. Listen for its rich, melodious song. (Source: RSPB)"
  },
  {
    species: "Bluetit",
    scientificName: "Cyanistes caeruleus",
    imageUrl: "https://scottishwildlifetrust.org.uk/wp-content/uploads/2020/02/wildlifetrusts_48763522542-e1581604334974.jpg",
    identification: "This small, lively bird features a striking blue cap, white cheeks, and a yellow belly. Its agile movements and presence at feeders make it easy to spot. (Source: RSPB)"
  },
  {
    species: "Carrion Crow",
    scientificName: "Corvus corone",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:c362cdfb-f501-4204-98fe-e2cffdb938f0/2180619-Species-Carrion-crow-perched-on-fence-post.jpg",
    identification: "Carrion Crows are entirely black with a robust build and a strong bill. They are typically seen in open countryside or urban settings and are known for their intelligent behavior. (Source: RSPB)"
  },
  {
    species: "Chaffinch",
    scientificName: "Fringilla coelebs",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:84326b5d-ac35-40ee-8a4a-ace6dd60657f/2115151343-Species-Chaffinch-FEMALE-on-branch.jpg",
    identification: "The Chaffinch displays varied colors; males boast a blue-grey cap with reddish underparts and distinctive white wing bars, while females have more muted tones. (Source: RSPB)"
  },
  {
    species: "Coal Tit",
    scientificName: "Periparus ater",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:daf3844d-1773-4a7a-b262-c3b483274d95/Species-Coal%20Tit-BGBW.jpg",
    identification: "Small and active, the Coal Tit has a distinctive black cap with white cheeks. Its quick movements in woodlands make it a delightful find for birdwatchers. (Source: RSPB)"
  },
  {
    species: "Collared Dove",
    scientificName: "Streptopelia decaocto",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:5ef8ce97-f6cb-48b8-a5e0-08ce3deff9d2/Species-Collared%20Dove-BGBW.jpg",
    identification: "Easily identified by the subtle black ‘collar’ around its nape and soft cooing calls, the Collared Dove is a common visitor to gardens and urban areas. (Source: RSPB)"
  },
  {
    species: "Dunnock",
    scientificName: "Prunella modularis",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:1f0fe525-3c55-4dbc-874d-c20556123f1d/Species-Dunnock-BGBW.jpg",
    identification: "Often found skulking in hedgerows, the Dunnock is a small, modestly colored bird with brownish plumage and a delicate structure, sometimes referred to as a hedge sparrow. (Source: RSPB)"
  },
  {
    species: "Feral Pigeon",
    scientificName: "Columba livia",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:ad793298-36a7-4164-a274-d36b87cb4a7c/2186817633-Species-Rock-dove-feral-pigeon-walking-on-rock.jpg",
    identification: "A common urban bird, the Feral Pigeon exhibits a grey body with variable markings and iridescent neck patches. Its adaptability has led to many color variations in city populations. (Source: RSPB)"
  },
  {
    species: "Goldfinch",
    scientificName: "Carduelis carduelis",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:b6206427-1294-4fd5-9802-8a60da4166e1/____________1719550366-Species-goldfinch-on-branch-yellow-leaves.12231457836407822748.4102416274174699093.798384376815356056.13721152601242114202.jpg",
    identification: "Goldfinches are vibrant birds with a red face, black-and-yellow wings, and a distinctive red patch on the breast. Their twittering song and acrobatic flight make them easily identifiable. (Source: RSPB)"
  },
  {
    species: "Great Tit",
    scientificName: "Parus major",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:ab42344e-92b8-4afc-8a58-0ffbc2c9428a/1555509032-Species-Great-tit-ADULT-perched-on-moss-covered-branch.jpg",
    identification: "The Great Tit is a robust and common garden bird. It features a black head, white cheeks, and yellow underparts, making it unmistakable at bird feeders. (Source: RSPB)"
  },
  {
    species: "Greenfinch",
    scientificName: "Chloris chloris",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:28393eeb-349e-4d6c-b602-ed23f04c1ce9/Species-Greenfinch-BGBW.jpg",
    identification: "Greenfinches are plump birds with predominantly green and yellow plumage. Their stout bill and slightly curled tail help in distinguishing them, especially in woodland or garden habitats. (Source: RSPB)"
  },
  {
    species: "House Sparrow",
    scientificName: "Passer domesticus",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:815e33a6-4992-4401-b372-84f434164a8b/1713630676-Species-House-Sparrow-stood-on-lichen-log%20(1).jpg",
    identification: "House Sparrows are small, sociable birds often seen around human habitation. Males typically feature a distinctive black bib with grey-brown plumage overall. (Source: RSPB)"
  },
  {
    species: "Jackdaw",
    scientificName: "Coloeus monedula",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:09f2587f-a0c3-4583-bdb4-d199a152a569/1261265839-Species-Jackdaw-on-branch-looking-to-side_1.jpg",
    identification: "Jackdaws are smaller crow-like birds with predominantly black plumage accented by a grey nape and pale eyes. They are often observed in inquisitive flocks. (Source: RSPB)"
  },
  {
    species: "Long Tailed Tit",
    scientificName: "Aegithalos caudatus",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:3af85219-0c89-4797-a878-1af47403c740/1417623404-Species-Long-Tailed-Tit-JUVENILE-perched-on-branch.jpg",
    identification: "This charming bird is noted for its disproportionately long, fluffy tail and small, rounded body. Its soft grey plumage and delicate features make it a favorite among bird enthusiasts. (Source: RSPB)"
  },
  {
    species: "Magpie",
    scientificName: "Pica pica",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:654b3e61-1f98-4ab1-827a-6bc321517942/___1850229250-Species-magpie-stood-on-branch_1.14086855069194369589.jpg",
    identification: "Magpies are striking with their black and white plumage and long, graduated tail. Their intelligent behavior and varied vocalizations set them apart in both urban and rural areas. (Source: RSPB)"
  },
  {
    species: "Robin",
    scientificName: "Erithacus rubecula",
    imageUrl: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/10/23/pg-18-robin-2-pa.jpg",
    identification: "Easily recognized by its vivid red breast and soft brown upperparts, the Robin is a beloved garden bird with a distinctive upright posture and a melodious song. (Source: RSPB)"
  },
  {
    species: "Song Thrush",
    scientificName: "Turdus philomelos",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:89863ca9-3c99-4e8c-ab11-e7d038f63294/1072624-Species-Song-Thrush-perched-on-branch.jpg",
    identification: "The Song Thrush has a speckled breast and is well known for its varied, repetitive song. Often heard in gardens and woodland edges, its patterned plumage aids identification. (Source: RSPB)"
  },
  {
    species: "Starling",
    scientificName: "Sturnus vulgaris",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:4785c94a-8e46-4a0e-b027-267afe710d9d/Species-Starling-BGBW.jpg",
    identification: "Starlings feature glossy, iridescent black plumage that can show hints of speckling in winter. Their dynamic, murmuration displays and vocal repertoire make them memorable. (Source: RSPB)"
  },
  {
    species: "Wood Pigeon",
    scientificName: "Columba palumbus",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:9beed41c-9c82-4c14-972b-011d61345fd9/___1656641140-Species-Woodpigeon-ADULT-Sat-on-branch-in-rain.8223708753546319251.jpg",
    identification: "Wood Pigeons are large, with a soft grey body and a noticeable white patch on the neck. Their gentle cooing and presence in woodlands and parks make them easy to spot. (Source: RSPB)"
  },
  {
    species: "Wren",
    scientificName: "Troglodytes troglodytes",
    imageUrl: "https://base-prod.rspb-prod.magnolia-platform.com/.imaging/focalpoint/landscape16to9/_WIDTH_x_HEIGHT_/dam/jcr:1524a416-da2c-4785-9e90-d10eabd8563e/2168197-Species-Wren-on-branch-winter.jpg",
    identification: "Despite their small size, Wrens are bold singers. Their brown plumage, energetic movements, and distinctive upright tail help birdwatchers locate them even in dense undergrowth. (Source: RSPB)"
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