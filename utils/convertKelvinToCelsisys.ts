// 한국인에게 익숙학 'C(섭씨)로 바꿔주는 함수

export function convertKelvinToCelsius(tempInKelvin: number): number {
    const tempInCelsius = tempInKelvin - 273.15;
    return Math.floor(tempInCelsius); // Removes decimal part and keeps integer part
  }