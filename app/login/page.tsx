"use client";
import { api } from "@/config/api";
import { FC, useState } from "react";

type Payload = { identifier: string; password: string };

const Login: FC = () => {
  const [form, serForm] = useState<Payload>({
    identifier: "",
    password: "",
  });

  return (
    <form
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        api.login
          .post(form)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }}
    >
      <input
        type="text"
        value={form.identifier}
        onChange={({ currentTarget: { value } }) =>
          serForm((prev) => ({ ...prev, identifier: value }))
        }
      />
      <input
        type="password"
        value={form.password}
        onChange={({ currentTarget: { value } }) =>
          serForm((prev) => ({ ...prev, password: value }))
        }
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
