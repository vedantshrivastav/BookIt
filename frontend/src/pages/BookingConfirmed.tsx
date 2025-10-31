import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const BookingConfirmed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refId } = location.state || { refId: "N/A" };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
      <h1 className="text-2xl font-semibold">Booking Confirmed</h1>
      <p className="text-gray-600 mt-2">Ref ID: {refId}</p>
      <Button onClick={() => navigate("/")} className="mt-6">
        Back to Home
      </Button>
    </div>
  );
};

export default BookingConfirmed;
