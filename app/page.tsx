"use client"
import Image from "next/image";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button"

export default function Home() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [showImage, setShowImage] = useState(false);

  const handleCalculateBmi = () => {
    if (!height || !weight) {
      alert("Please enter valid height and weight");
      return;
    }
    
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi);
    setShowImage(true);
  };

  const handleClear = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setBmi(null);
    setShowImage(false);
  };

  return (
    <div className="min-h-screen flex justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="grid items-center md:flex md:items-center md:justify-around md:gap-20">
        {showImage && (
          <div className="bmi_chart md:w-auto md:h-auto border-2 rounded-md bg-white">
            <Image
              src="/bmi chart.png"
              width={400}
              height={400}
              alt="bmi"
              className="rounded-md"
            />
          </div>
        )}
        <div className="bmi_calculator">
          <Card>
            <CardHeader>
              <CardTitle>BMI Calculator</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-around gap-4">
              <div className="age flex flex-nowrap items-center gap-9">
                <h1>Age</h1>
                <Input value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div className="gender flex flex-nowrap items-center gap-4">
                <h1>Gender</h1>
                <RadioGroup
                  value={gender}
                  onValueChange={setGender}
                  className="flex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="height flex flex-nowrap items-center gap-4">
                <h1>Height</h1>
                <Input
                  placeholder="cm"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="weight flex flex-nowrap items-center gap-4">
                <h1>Weight</h1>
                <Input
                  placeholder="kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <div className="button w-full flex items-center gap-2">
                <Button
                  className="flex-grow bg-green-800 hover:bg-green-600"
                  onClick={handleCalculateBmi}
                >
                  Calculate
                </Button>
                <Button className="bg-gray-600" onClick={handleClear}>
                  Clear
                </Button>
              </div>
              {bmi && (
                <div className="display self-start">
                  <p>Your BMI is: {bmi.toFixed(2)}</p>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
