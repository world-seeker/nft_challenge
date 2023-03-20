import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import Header from "../../components/atoms/Header";

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);
	// If the user is already logged in, redirect.
	// Note: Make sure not to redirect to the same page
	// To avoid an infinite loop!
	if (session) {
		return { redirect: { destination: "/" } };
	}
	const providers = await getProviders();

	return {
		props: {
			
			providers: providers ?? [],
		},
	};
}

export default function SignIn({  providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<>
         <Header/>
		
      <div className=" flex flex-col items-center
	   justify-center ">

	  <img
	   className="w-80"
	   src="https://links.papareact.com/ocw" 
	   alt="icon"/>
		  <p className="text-xs italic">This app has been Made for eductional purposes</p>

		<div className="mt-40">

			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
				 <button className="p-3 bg-blue-500 rounded-lg
				 text-white" onClick={() => signIn(provider.id,{callbackUrl:"/"})}>
					Sign in with {provider.name}</button>
				</div>
				
			))}

		</div>
	  </div>
		</>
	);
}