export function delayForLoading(promise: Promise<any>) {
	return new Promise((resolve) => setTimeout(resolve, 2000)).then(() => promise);
}
