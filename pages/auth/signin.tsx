import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";

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
		<React.Fragment>
			<div className="flex justify-center ">
			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
					<button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
				</div>
				
			))}</div>
		</React.Fragment>
	);
}