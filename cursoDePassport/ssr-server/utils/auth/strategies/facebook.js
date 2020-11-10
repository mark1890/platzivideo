const passport = require('passport')
const { Strategy: FacebookStrategy } = require('passport-facebook')
const axios = require('axios')
const { config } = require('../../../config')
const boom = require('@hapi/boom')

passport.use(new FacebookStrategy({
	clientID: config.FACEBOOK_CLIENT_ID,
	clientSecret: config.FACEBOOK_CLIENT_SECRET,
	callbackURL: "/auth/facebook/callback"
},
async function (accessToken, refreshToken, profile, done) {
		const { data, status } = await axios({
			url: `${config.apiUrl}/api/auth/sign-provider`,
			method: 'post',
			data: {
				name: profile.name,
				email: profile.email,
				password: profile.id,
				apiKeyToken: config.apiKeyToken
			}
		})
		if (!data || status !== 200) {
			return done(boom.unauthorized(), false)
		}
		return done(null, data)
	}
))