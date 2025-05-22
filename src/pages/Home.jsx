import React, { useState } from "react";
import OptionBar from "../components/OptionBar";
import Card from "../components/Card";
import Photos from "../data/photos.json";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState("Name A to Z");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleOrderChange = (order) => {
    setSelectedOrder(order);
  };

  const handleSearchChange = (search) => {
    setSearchTerm(search);
  };

  // Fonction pour trier les photos en fonction de l'ordre sélectionné
  const sortPhotos = (photos) => {
    switch (selectedOrder) {
      case "Name A to Z":
        return photos.sort((a, b) => a.title.localeCompare(b.title));
      case "Name Z to A":
        return photos.sort((a, b) => b.title.localeCompare(a.title));
      case "Date added new to old":
        return photos.sort(
          (a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)
        );
      case "Date added old to new":
        return photos.sort(
          (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
        );
      default:
        return photos;
    }
  };

  // Filtrer les photos en fonction de la catégorie sélectionnée et du terme de recherche
  const filteredPhotos = Photos.filter(
    (photo) => selectedCategory === "All" || photo.category === selectedCategory
  ).filter((photo) =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Trier les photos filtrées
  const sortedFilteredPhotos = sortPhotos(filteredPhotos);

  return (
    <>
      <OptionBar
        onOrderChange={handleOrderChange}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />
      <div className="flex flex-wrap justify-center gap-2 p-4">
        {sortedFilteredPhotos.map((photo) => (
          <Card key={photo.id} photo={photo} />
        ))}
      </div>
    </>
  );
}
