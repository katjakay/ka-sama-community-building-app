import RegisterForm from './RegisterForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default function RegisterPage(props: Props) {
  return (
    <main className="m-6 mt-10">
      <h3 className="text-brown">REGISTER</h3>
      <h1 className="text-4xl mb-6 mt-4">
        This is KA-SAMA! Filipino culture and more
      </h1>
      <RegisterForm returnTo={props.searchParams.returnTo} />;
    </main>
  );
}
