import { cn } from '@/utils/cn';
import Image from 'next/image'
import React from 'react'

type Props = {}


export default function WeatherIcon(
    { iconName, ...rest }: React.HTMLProps<HTMLDivElement> & { iconName: string }
  ) {
    return (
      <div title={iconName} {...rest} className={cn("relative h-20 w-20", rest.className)}>
        <Image
          width={100}
          height={100}
          alt="weather-icon"
          className="absolute h-full w-full"
          src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
        />
      </div>
    );
  }
  

//div 태그가 가질 수 있는 모든 props 가능하게 함 (ex: onClick, className 등)
//{ iconName: string }	필수 props : 아이콘 이름
