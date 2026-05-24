import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { usePuterStore } from '~/lib/puter'

export const meta = () => ([
  { title: 'Resumind | Auth' },
  { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
  const { isLoading, auth } = usePuterStore()

  const location = useLocation()
  const navigate = useNavigate()

  // Extragem parametrul "next" din URL (ex: /auth?next=/upload)
  // Dacă nu există, mergem pe home "/"
  const next = new URLSearchParams(location.search).get('next') || '/'

  // Când utilizatorul e autentificat, îl redirecționăm automat
  useEffect(() => {
    if (auth.isAuthenticated) navigate(next)
  }, [auth.isAuthenticated, next])

  const handleSignIn = async () => {
    await auth.signIn()
  }

  const handleSignOut = async () => {
    await auth.signOut()
  }

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">

          {/* Titlu */}
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log In to Continue Your Job Journey</h2>
          </div>

          {/* Butoane de autentificare */}
          <div>
            {isLoading ? (
              // Se afișează când Puter verifică dacă ești logat
              <button className="auth-button animate-pulse">
                <p>Signing you in...</p>
              </button>
            ) : auth.isAuthenticated ? (
              // Ești deja logat → buton de Sign Out
              <button className="auth-button" onClick={handleSignOut}>
                <p>Sign Out</p>
              </button>
            ) : (
              // Nu ești logat → buton de Sign In
              <button className="auth-button" onClick={handleSignIn}>
                <p>Sign In</p>
              </button>
            )}
          </div>

        </section>
      </div>
    </main>
  )
}

export default Auth