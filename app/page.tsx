"use client";

import Navbar from "@/components/Navbar";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import {format, parseISO} from 'date-fns';
import Container from "@/components/Container";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsisys";
import WeatherIcon from "@/components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayorNightIcon";
import { useState } from "react";



// NEXT_PUBLIC_WEATHER_KEY

interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [queryValue, setQueryValue] = useState('Seoul');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`);
      return data;
    },
    onSuccess: (data) => {
      setWeatherData(data);
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();  // 검색 버튼 눌렀을 때만 호출
  };
  

  const firstData = weatherData?.list[0];

  const dailyData = weatherData?.list.filter((item, index, self) =>
    self.findIndex(
      (v) => v.dt_txt.slice(0, 10) === item.dt_txt.slice(0, 10)
    ) === index
  );

  if (isPending)
    return <div className="flex min-h-screen justify-center items-center font-bold text-2xl">날씨 데이터를 로딩 중입니다...</div>;

  if (error)
    return <div className="flex min-h-screen justify-center items-center font-bold text-2xl text-red-700">날씨 데이터를 가져오던 중 에러가 발생했습니다.</div>;

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100 gap-4">
      <Navbar 
        location={weatherData?.city.name}
        value={searchValue}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
  
      {firstData? (
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* 오늘 날씨 */}
        <section>
          <div>
            <h2 className="flex gap-1 text-2xl items-center">
              <p>{format(parseISO(firstData.dt_txt), 'EEEE')}</p>
              <p className="text-lg">
                ({format(parseISO(firstData.dt_txt), 'yyyy.MM.dd')})
              </p>
            </h2>
            <div>
              <Container className="gap-10 px-6 items-center">
                {/* 현재 온도 */}
                <div className="flex flex-col px-4">
                  <span className="text-4xl">
                    {convertKelvinToCelsius(firstData?.main.temp ?? 0)}℃
                  </span>
                  <p className="text-xs whitespace-nowrap">
                    체감 온도: {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}℃
                  </p>
                </div>
  
                {/* 시간대별 날씨 */}
                <div className="flex pr-3 gap-10 sm:gap-16 overflow-auto w-full justify-between">
                  {weatherData?.list.map((d) => (
                    <div 
                      key={d.dt} 
                      className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                    >
                      <p className="whitespace-nowrap">
                        {format(parseISO(d.dt_txt), 'h:mm a')}
                      </p>
                      <WeatherIcon iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)} />
                      <p>{convertKelvinToCelsius(d.main.temp)}℃</p>
                    </div>
                  ))}
                </div>
  
              </Container>
            </div>
          </div>
        </section>
  
        {/* 7일 예보 */}
        <section>
          <h2 className="text-xl font-semibold pb-2">7 Day Forecast</h2>
  
          <div className="w-full flex justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 pt-4 w-full">
              {dailyData?.map((d) => (
                <div 
                  key={d.dt} 
                  className="bg-white shadow rounded-xl px-4 py-6 flex flex-col items-center gap-2"
                >
                  <p className="text-sm font-medium">
                    {format(parseISO(d.dt_txt), 'EEEE')}
                  </p>
                  <WeatherIcon iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)} />
                  <p className="text-lg font-bold">{convertKelvinToCelsius(d.main.temp)}℃</p>
                  <p className="text-xs text-gray-500">{d.weather[0].main}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
      </main>
      ) : (
        <div className="flex flex-col min-h-screen items-center mt-20 font-bold"> 
          <Image src="/weather-bg.png" alt="날씨 배경" width={400} height={400} />
          <p className="font-bold text-xl mb-2">날씨 정보를 검색해주세요.</p>
          <p className="text-md">오늘의 날씨와 7일간의 날씨 정보를 알 수 있습니다.</p>
        </div>
      )}
    </div>
  );
}