import { v4 as uuidv4 } from 'uuid';

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
}

interface ImageGallery {
  id: string;
  name: string;
  images: string[];
}

interface RecipeInput {
  title: string;
  ingredients: string[];
  instructions: string;
}

interface ImageGalleryInput {
  name: string;
  images: string[];
}

const recipes: Recipe[] = [];
const imageGalleries: ImageGallery[] = [];

const resolvers = {
  Query: {
    recipe: (parent: any, { id }: { id: string }) => {
      return recipes.find((recipe) => recipe.id === id);
    },
    allRecipes: () => {
      return recipes;
    },
    imageGallery: (parent: any, { id }: { id: string }) => {
      return imageGalleries.find((gallery) => gallery.id === id);
    },
    allImageGalleries: () => {
      return imageGalleries;
    },
  },
  Mutation: {
    createRecipe: (parent: any, { title, ingredients, instructions }: RecipeInput) => {
      const recipe: Recipe = {
        id: generateUniqueId(),
        title,
        ingredients,
        instructions,
      };
      recipes.push(recipe);
      return recipe;
    },
    createImageGallery: (parent: any, { name, images }: ImageGalleryInput) => {
      const imageGallery: ImageGallery = {
        id: generateUniqueId(),
        name,
        images,
      };
      imageGalleries.push(imageGallery);
      return imageGallery;
    },
  },
};

function generateUniqueId(): string {
  return uuidv4();
}

export default resolvers;
