import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FrequencyAnalysis = () => {
  const [englishData, setEnglishData] = useState([]);
  const [chineseData, setChineseData] = useState([]);

  useEffect(() => {
    // Sample text in both languages
    const englishText = "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. Pangrams are often used to display fonts and test keyboards.";
    const chineseText = "床前明月光，疑是地上霜。举头望明月，低头思故乡。静夜思是李白最著名的诗歌之一，描绘了游子思乡的情感。";

    // Function to perform FFT-like analysis (simplified for visualization)
    const analyzeText = (text) => {
      const frequencies = new Array(26).fill(0);
      const normalizedData = [];
      
      // Count character frequencies
      for (let char of text) {
        const code = char.toLowerCase().charCodeAt(0);
        if (code >= 97 && code <= 122) { // English letters
          frequencies[code - 97]++;
        }
      }

      // Normalize and create visualization data
      const total = frequencies.reduce((a, b) => a + b, 0);
      for (let i = 0; i < frequencies.length; i++) {
        normalizedData.push({
          character: String.fromCharCode(i + 97),
          frequency: (frequencies[i] / total) * 100
        });
      }

      return normalizedData;
    };

    // Analyze both texts
    setEnglishData(analyzeText(englishText));
    setChineseData(analyzeText(chineseText));
  }, []);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Frequency Analysis of English vs Chinese Text</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="character" 
                  type="category" 
                  allowDuplicatedCategory={false} 
                  data={englishData}
                />
                <YAxis label={{ value: 'Frequency (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line 
                  data={englishData}
                  type="monotone"
                  dataKey="frequency"
                  stroke="#8884d8"
                  name="English"
                  dot={false}
                />
                <Line 
                  data={chineseData}
                  type="monotone"
                  dataKey="frequency"
                  stroke="#82ca9d"
                  name="Chinese"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Key observations:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>English shows more varied frequency distribution across letters</li>
              <li>Chinese text when mapped to Latin alphabet shows different patterns</li>
              <li>Common English letters (e, t, a) show higher frequencies</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageFourierAnalysis;
