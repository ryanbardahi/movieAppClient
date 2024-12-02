const UpdateMovieModal = ({ movie, onClose }) => {
  const [formData, setFormData] = useState(movie);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://moviecatalogapi-bardahi.onrender.com/movies/updateMovie/${movie._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Movie updated successfully!");
        onClose();
      } else {
        alert("Failed to update movie.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="modal">
      {/* Form similar to AddMovieModal */}
    </div>
  );
};