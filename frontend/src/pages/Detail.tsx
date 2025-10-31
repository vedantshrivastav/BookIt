import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { DateButton } from "@/components/DateButton";
import { TimeSlot } from "@/components/TimeSlot";
import { QuantitySelector } from "@/components/QuantitySelector";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";

interface Slot {
  time: string;
  available: number;
  status: string;
}

interface AvailableDate {
  date: string;
  slots: Slot[];
}

interface Experience {
  _id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  price: number;
  availableDates: AvailableDate[];
  about: string;
}

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  // ✅ Fetch experience details by ID
  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const fetchExperience = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/experiences/${id}`);
        const result = await res.json();
        setData(result);

        // Set default date/time after fetch
        if (result.availableDates?.length > 0) {
          setSelectedDate(result.availableDates[0].date);
          const firstSlot = result.availableDates[0].slots?.[0];
          if (firstSlot) setSelectedTime(firstSlot.time);
        }
      } catch (error) {
        console.error("Failed to fetch experience details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id, navigate]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-muted-foreground">Loading...</p>
    );
  }

  if (!data) {
    return (
      <p className="text-center mt-20 text-red-500">Experience not found.</p>
    );
  }

  // ✅ Extract dynamic dates & time slots
  const dates = data.availableDates.map((d) => d.date);
  const selectedDateObj = data.availableDates.find(
    (d) => d.date === selectedDate
  );

  const timeSlots =
    selectedDateObj?.slots.map((slot) => ({
      time: slot.time,
      slotsLeft: slot.available,
      isSoldOut: slot.status === "sold out",
    })) || [];

  const basePrice = data.price || 999;
  const subtotal = basePrice * quantity;
  const taxes = 59;
  const total = subtotal + taxes;

  const handleConfirm = () => {
    navigate("/checkout", {
      state: {
        id,
        title: data.title,
        date: selectedDate,
        time: selectedTime,
        quantity,
        subtotal,
        taxes,
        total,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Header
          searchQuery={""}
          onSearchChange={() => {}}
          onSearch={() => {}}
        />

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-foreground mb-6 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        <div className="grid lg:grid-cols-[1fr,380px] gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-3 text-foreground">
                {data.title}
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Choose Date */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Choose date
              </h2>
              <div className="flex flex-wrap gap-3">
                {dates.map((date) => (
                  <DateButton
                    key={date}
                    date={date}
                    isSelected={selectedDate === date}
                    onClick={() => {
                      setSelectedDate(date);
                      const found = data.availableDates.find(
                        (d) => d.date === date
                      );
                      if (found?.slots?.[0]) {
                        setSelectedTime(found.slots[0].time);
                      }
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Choose Time */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Choose time
              </h2>
              <div className="flex flex-wrap gap-3 mb-3">
                {timeSlots.map((slot) => (
                  <TimeSlot
                    key={slot.time}
                    time={slot.time}
                    slotsLeft={slot.slotsLeft}
                    isSoldOut={slot.isSoldOut}
                    isSelected={selectedTime === slot.time}
                    onClick={() =>
                      !slot.isSoldOut && setSelectedTime(slot.time)
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                All times are in IST (GMT +5:30)
              </p>
            </div>

            {/* About */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                About
              </h2>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  {data.about || "No additional info provided."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Starts at</span>
                <span className="text-2xl font-bold text-foreground">
                  ₹{basePrice}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Quantity</span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity(quantity + 1)}
                  onDecrease={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                />
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">₹{subtotal}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="text-foreground">₹{taxes}</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="text-xl font-semibold text-foreground">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-foreground">
                    ₹{total}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleConfirm}
                className="w-full h-12 text-base font-semibold"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
