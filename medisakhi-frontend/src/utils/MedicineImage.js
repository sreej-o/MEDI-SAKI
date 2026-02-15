export function getMedicineImage(use) {
  if (!use) {
    return "https://images.unsplash.com/photo-1580281658629-1a2c6a7e9f38";
  }

  const text = use.toLowerCase();

  if (text.includes("blood pressure") || text.includes("hypertension")) {
    return "https://images.unsplash.com/photo-1588776814546-1ffcf47267f4";
  }

  if (text.includes("allergy")) {
    return "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae";
  }

  if (text.includes("infection") || text.includes("antibiotic")) {
    return "https://images.unsplash.com/photo-1587854692152-cbe660dbde88";
  }

  if (text.includes("cough") || text.includes("cold")) {
    return "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2";
  }

  if (text.includes("pain") || text.includes("fever")) {
    return "https://images.unsplash.com/photo-1580281657527-47f249e8f5c4";
  }

  return "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1179&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
}
