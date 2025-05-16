"use client";
import { useTheme } from "next-themes";
import { FC } from "react";

const Home: FC = () => {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-5">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        quas, ex similique dolor impedit quisquam ipsa ratione? Voluptatem, quis
        ducimus unde, perferendis accusantium dolorem quaerat at nulla sequi,
        possimus nostrum!
      </p>
      <select onChange={({ currentTarget: { value } }) => setTheme(value)}>
        <option value="system">system</option>
        <option value="dark">dark</option>
        <option value="light">light</option>
      </select>
    </div>
  );
};

export default Home;
