import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Header from "@/components/Header";
import ExperienceCard from "@/components/ExperienceCard";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch experiences from backend
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get(
          "https://bookit-1-10fj.onrender.com/api/experiences"
        ); // 🔗 replace with your actual backend URL
        setExperiences(res.data);
      } catch (error) {
        console.error("Error fetching experiences ❌", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const filteredExperiences = useMemo(() => {
    if (!searchQuery.trim()) return experiences;
    const query = searchQuery.toLowerCase();
    return experiences.filter(
      (exp) =>
        exp.title.toLowerCase().includes(query) ||
        exp.location.toLowerCase().includes(query) ||
        exp.description.toLowerCase().includes(query)
    );
  }, [searchQuery, experiences]);

  const handleSearch = () => {
    // Search is already reactive via useMemo
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading experiences...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />
      <main className="container mx-auto px-8 lg:px-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredExperiences.length > 0 ? (
            filteredExperiences.map((experience) => (
              <ExperienceCard
                key={experience._id || experience.id}
                {...experience}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">
                No experiences found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
