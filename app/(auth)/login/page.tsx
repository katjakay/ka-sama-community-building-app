import LoginForm from './LoginForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default function LoginPage(props: Props) {
  return (
    <main className="m-6 mt-10">
      <h3 className="text-yellow">LOGIN</h3>
      <h1 className="text-4xl mb-6 mt-4">
        Welcome back, login to join and create
      </h1>
      <span>
        <LoginForm returnTo={props.searchParams.returnTo} />
        {/* <div className="avatar">
          <div className="w-24 rounded">
            <img
              src="https://cdn.shopify.com/s/files/1/0632/4659/8402/files/JUNACO_SEPT_2020_53_d019cd72-9817-4cd7-a9d2-da75f8268227.jpg?v=1652992090&width=750"
              alt="girl with curls"
            />
          </div> */}
        {/* </div> */}
      </span>
    </main>
  );
}
