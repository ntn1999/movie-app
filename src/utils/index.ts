export function delayForLoading(promise: Promise<any>) {
	return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => promise);
}
