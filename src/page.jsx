import { useState, useEffect } from "react";

export function Page() {
  const [name, setName] = useState("sinan");

  useEffect(() => {
    console.log("sayfa yüklendi");
  }, []);

  const changeName = () => {
    setName("Sinan");
  };

  return (
    //view
    <div style={{ height: "100%" }}>
      <button onClick={changeName}>İsmi Değiştir</button>
      <h1>{name}</h1>
    </div>
  );
}
