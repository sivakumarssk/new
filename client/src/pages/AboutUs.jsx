function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
            SKY DRIVE INN
          </h2>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About SKY Events
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto rounded-full"></div>
          <p className="text-xl text-gray-200 mt-6 max-w-2xl mx-auto">
            Creating extraordinary experiences, one event at a time
          </p>
        </div>

        {/* Main Story Section */}
        <div className="mb-20">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-12 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                One Year of Excellence
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-gray-200 leading-relaxed">
              <p>
                SKY Events is a dynamic and fast-growing event management company that has 
                successfully completed one year of creating memorable experiences. Since our 
                inception, we have had the privilege of organizing a variety of events, each 
                executed with creativity, precision, and passion.
              </p>
              <p>
                From corporate gatherings and social celebrations to private parties and special 
                occasions, SKY Events is committed to delivering exceptional quality and seamless 
                execution.
              </p>
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div className="mb-20">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Our Dedicated Approach
            </h2>
            <p className="text-lg text-gray-200 text-center leading-relaxed max-w-3xl mx-auto">
              Our dedicated team works closely with clients to understand their vision and transform 
              it into reality with innovative ideas, professional planning, and flawless coordination. 
              With every event we organize, we strive to exceed expectations and leave a lasting impression.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-yellow-400/30 transition-all duration-300">
              <div className="text-5xl mb-4 text-center">🏢</div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Corporate Events</h3>
              <p className="text-gray-300 text-center leading-relaxed">
                Professional corporate gatherings with seamless execution and attention to detail
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-yellow-400/30 transition-all duration-300">
              <div className="text-5xl mb-4 text-center">🎊</div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Social Celebrations</h3>
              <p className="text-gray-300 text-center leading-relaxed">
                Memorable social events that bring people together in celebration
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-yellow-400/30 transition-all duration-300">
              <div className="text-5xl mb-4 text-center">🎈</div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Private Parties</h3>
              <p className="text-gray-300 text-center leading-relaxed">
                Intimate and personalized events tailored to your unique vision
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">💡</div>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-3">Innovation</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We bring fresh, creative ideas to every event, ensuring a unique and memorable 
                    experience that stands out from the rest.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">⭐</div>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-3">Excellence</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Every detail matters. We maintain the highest standards of quality and professionalism 
                    in all our events.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">🤝</div>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-3">Partnership</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We work closely with our clients as partners, understanding their vision and bringing 
                    it to life with dedication and care.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">🎯</div>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-3">Precision</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Flawless coordination and meticulous planning ensure that every event runs smoothly 
                    from start to finish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Section */}
        <div className="mb-20">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-10 md:p-14 border border-white/10 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Celebrating Our First Year
            </h2>
            <p className="text-lg text-gray-200 text-center mb-10 max-w-2xl mx-auto">
              As we celebrate our first year of success, SKY Events looks forward to many more 
              milestones and opportunities to create extraordinary moments.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                <div className="text-4xl font-bold text-yellow-400 mb-2">1+</div>
                <div className="text-white font-semibold">Year of Excellence</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                <div className="text-4xl font-bold text-yellow-400 mb-2">100+</div>
                <div className="text-white font-semibold">Events Organized</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
                <div className="text-white font-semibold">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Your Next Memorable Event?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's work together to bring your vision to life!
          </p>
          <a
            href="/contact-us"
            className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-4 px-10 rounded-full text-lg hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
