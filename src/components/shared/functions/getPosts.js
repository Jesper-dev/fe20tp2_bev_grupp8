const getPosts = (firebase, username, liked) => {
	let posts = [];

	firebase.user(username + "/posts").on('value', snapshot => {
		let data = snapshot.val();

		for (const key in data) {
			posts.push({...data[key]});
		}

		if (liked) {
			console.log(posts.filter(post => post.liked === true));
			// return posts.filter(post => post.liked === true);
		} else {
			console.log(posts);
			// return posts;
		}
	});
};

export default getPosts;