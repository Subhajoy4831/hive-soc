// pages/profile/[id].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";
import Link from "next/link";
import { MapPin, Heart, User2, Calendar, ArrowLeft } from 'lucide-react';

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchUserProfile(id);
    }
  }, [id]);

  const fetchUserProfile = async (userId) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      setError("Failed to load profile data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
          <Link href="/home" passHref>
            <div className="flex items-center gap-2 text-gray-600 hover:text-blue-500 cursor-pointer">
              <ArrowLeft size={18} />
              <span>Back to Search</span>
            </div>
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Profile Header */}
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            
            <div className="px-6 pb-6">
              {/* Profile Image */}
              <div className="relative -mt-16 mb-4">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                  <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                    {profile?.firstName?.[0]}{profile?.lastName?.[0]}
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profile?.firstName} {profile?.lastName}
                  </h2>
                </div>

                {/* Profile Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Age */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-blue-500" size={20} />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Age</p>
                        <p className="text-gray-900 font-medium">{profile?.age || "Not specified"}</p>
                      </div>
                    </div>
                  </div>

                  {/* City */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="text-blue-500" size={20} />
                      <div>
                        <p className="text-sm font-medium text-gray-500">City</p>
                        <p className="text-gray-900 font-medium">{profile?.city || "Not specified"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <User2 className="text-blue-500" size={20} />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Gender</p>
                        <p className="text-gray-900 font-medium">{profile?.gender || "Not specified"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <Heart className="text-blue-500" size={20} />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Interests</p>
                        <p className="text-gray-900 font-medium">{profile?.interests || "Not specified"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}