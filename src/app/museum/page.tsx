'use client';

import { useState } from 'react';
import SmoothScrollProvider from '@/components/museum/SmoothScrollProvider';
import EntranceSequence from '@/components/museum/EntranceSequence';
import MuseumRoom from '@/components/museum/MuseumRoom';
import BookPedestal from '@/components/museum/BookPedestal';

export default function MuseumPage() {
  const [showEntrance, setShowEntrance] = useState(true);

  if (showEntrance) {
    return (
      <EntranceSequence
        onComplete={() => setShowEntrance(false)}
        // videoSrc="/videos/entrance-greenhouse.mp4" // Replace with your AI-generated video
      />
    );
  }

  return (
    <SmoothScrollProvider>
      <div className="museum-container">
        {/* Room 1: The Garden of Becoming */}
        <MuseumRoom
          roomTitle="The Garden of Becoming"
          roomSubtitle="Foundations of Transformation"
          backgroundColor="#e8f0e0"
          // videoSrc="/videos/garden-overhead.mp4" // Replace with AI-generated drone shot
        >
          <BookPedestal
            title="The Path to Self-Actualization"
            author="Curator's Collection"
            coverImage="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"
            description="A transformative journey into understanding your highest potential and becoming the architect of your own destiny."
            price="$24.99"
            glowColor="#8A9A5B"
          />
        </MuseumRoom>

        {/* Room 2: The Library of Transformation */}
        <MuseumRoom
          roomTitle="The Library of Transformation"
          roomSubtitle="Knowledge & Wisdom"
          backgroundColor="#f5e8d8"
          // videoSrc="/videos/library-fpv.mp4" // Replace with FPV bookshelf shot
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
            <BookPedestal
              title="Mindful Living"
              author="Essential Series"
              coverImage="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop"
              description="Discover the art of present-moment awareness and cultivate inner peace in daily life."
              price="$19.99"
              glowColor="#d4a574"
            />
            <BookPedestal
              title="The Creative Self"
              author="Essential Series"
              coverImage="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop"
              description="Unlock your creative potential and express your authentic voice in the world."
              price="$22.99"
              glowColor="#c98474"
            />
          </div>
        </MuseumRoom>

        {/* Room 3: The Collective Writing Atelier */}
        <MuseumRoom
          roomTitle="The Collective Writing Atelier"
          roomSubtitle="Community & Creation"
          backgroundColor="#f0e8f5"
          // videoSrc="/videos/writing-room-crane.mp4" // Replace with crane shot
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="max-w-3xl text-center px-8">
              <h3 className="text-4xl font-bold mb-6 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                Join the Collective
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                A collaborative space where minds meet to create, share, and evolve together.
                Contribute your voice to our growing anthology of transformation.
              </p>
              <button className="px-12 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                Start Writing
              </button>
            </div>

            {/* Featured collective works */}
            <div className="mt-20 grid grid-cols-3 gap-6">
              <BookPedestal
                title="Voices of Change"
                author="Community Collection"
                coverImage="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop"
                description="Stories from our community of seekers and creators."
                price="Free"
                glowColor="#a78bfa"
              />
            </div>
          </div>
        </MuseumRoom>

        {/* Room 4: The Philosophy Salon */}
        <MuseumRoom
          roomTitle="The Philosophy Salon"
          roomSubtitle="Courses & Deep Learning"
          backgroundColor="#ffe8e8"
          // videoSrc="/videos/salon-orbit.mp4" // Replace with 360 orbit shot
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="max-w-4xl text-center px-8">
              <h3 className="text-5xl font-bold mb-6 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                Immersive Learning Experiences
              </h3>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Carefully curated courses that guide you through profound personal transformation.
                Each journey is designed to challenge, inspire, and elevate.
              </p>

              {/* Course offerings on pedestals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                <div className="course-card">
                  <div className="w-full h-64 bg-gradient-to-br from-rose-400 to-pink-500 rounded-lg mb-6 flex items-center justify-center">
                    <span className="text-6xl">🧘</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-3">Mindfulness Mastery</h4>
                  <p className="text-gray-600 mb-4">8-week immersive program</p>
                  <button className="px-8 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors">
                    Enroll Now
                  </button>
                </div>

                <div className="course-card">
                  <div className="w-full h-64 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg mb-6 flex items-center justify-center">
                    <span className="text-6xl">✍️</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-3">Authentic Expression</h4>
                  <p className="text-gray-600 mb-4">12-week creative journey</p>
                  <button className="px-8 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors">
                    Enroll Now
                  </button>
                </div>

                <div className="course-card">
                  <div className="w-full h-64 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg mb-6 flex items-center justify-center">
                    <span className="text-6xl">🌱</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-3">Growth & Integration</h4>
                  <p className="text-gray-600 mb-4">Lifetime membership</p>
                  <button className="px-8 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </MuseumRoom>

        {/* Exit/Footer Room */}
        <MuseumRoom
          roomTitle="Until We Meet Again"
          roomSubtitle="Your journey continues"
          backgroundColor="#2c3e2c"
        >
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <p className="text-2xl mb-8 opacity-80" style={{ fontFamily: "'Inter', sans-serif" }}>
                Thank you for visiting the Museum of Self-Actualization
              </p>
              <button className="px-12 py-4 bg-white text-gray-900 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300">
                Return to Entrance
              </button>
            </div>
          </div>
        </MuseumRoom>
      </div>

      <style jsx global>{`
        .museum-container {
          font-family: 'Inter', sans-serif;
        }

        .course-card {
          transition: transform 0.3s ease;
        }

        .course-card:hover {
          transform: translateY(-10px);
        }

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
      `}</style>
    </SmoothScrollProvider>
  );
}
