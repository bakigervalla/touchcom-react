interface Config {
  apiUrl: string;
}

export default <Config>{
  apiUrl: import.meta.env.VITE_API_URL as string,
};
