import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state; // get passed data

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(data?.total || 0);
  const [error, setError] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  if (!data) {
    navigate("/");
    return null;
  }

  const { title, date, time, quantity, subtotal, taxes, total, id } = data;
  console.log("this is the data id", id);
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setError("Please enter a promo code.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/experiences/promo/validate",
        { code: promoCode }
      );

      const resData = response.data;

      if (resData.valid) {
        setError("");
        let discountAmount = 0;

        if (resData.discountType === "percentage") {
          discountAmount = (total * resData.discountValue) / 100;
        } else if (resData.discountType === "flat") {
          discountAmount = resData.discountValue;
        }

        setDiscount(discountAmount);
        setFinalTotal(total - discountAmount);
        alert(`Promo applied! You saved ₹${discountAmount}`);
      } else {
        setError("Invalid promo code.");
        setDiscount(0);
        setFinalTotal(total);
      }
    } catch (err) {
      console.error("Promo validation failed:", err);
      setError("Server error. Please try again.");
    }
  };

  const handleConfirmBooking = async () => {
    try {
      setIsBooking(true);
      setError("");

      // Make booking API call
      const response = await axios.put(
        `http://localhost:3000/api/experiences/${id}/book`,
        {
          date: data.date,
          time: data.time,
        }
      );

      if (response.status === 200) {
        // ✅ Navigate to confirmation screen
        const refId = Math.random().toString(36).substring(2, 8).toUpperCase();
        navigate("/booking-confirmed", { state: { refId } });
      }
    } catch (err) {
      setError("Booking failed. Please try again.");
      console.error(err);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-foreground hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg font-medium">Checkout</span>
        </button>

        {/* Main Content */}
        <div className="grid md:grid-cols-[1fr,400px] gap-6">
          {/* Left Column - Form */}
          <div className="bg-card rounded-2xl p-8">
            <div className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="fullname"
                    className="text-sm text-muted-foreground"
                  >
                    Full name
                  </Label>
                  <Input
                    id="fullname"
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-input border-0 h-12 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm text-muted-foreground"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-input border-0 h-12 rounded-lg"
                  />
                </div>
              </div>

              {/* Promo Code */}
              <div className="space-y-2">
                <div className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="bg-input border-0 h-12 rounded-lg flex-1"
                  />
                  <Button
                    onClick={handleApplyPromo}
                    className="px-8 h-12 rounded-lg font-medium"
                  >
                    Apply
                  </Button>
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-3">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) =>
                    setAgreedToTerms(checked as boolean)
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground cursor-pointer select-none"
                >
                  I agree to the terms and safety policy
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="bg-card rounded-2xl p-8">
            <div className="space-y-6">
              {/* Experience Details */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium text-foreground">{title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-foreground">{date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium text-foreground">{time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Qty</span>
                  <span className="font-medium text-foreground">
                    {quantity}
                  </span>
                </div>
              </div>

              <div className="border-t border-border"></div>

              {/* Pricing */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">
                    ₹{subtotal}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="font-medium text-foreground">₹{taxes}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>Discount Applied</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-border"></div>

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-foreground">
                  Total
                </span>
                <span className="text-xl font-semibold text-foreground">
                  ₹{finalTotal}
                </span>
              </div>

              <Button
                disabled={isBooking}
                onClick={handleConfirmBooking}
                className="w-full h-14 rounded-lg text-base font-medium"
              >
                {isBooking ? "Processing" : "Pay & Confirm"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
