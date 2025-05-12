import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fonction de gestion de l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation basique des mots de passe
    if (password !== passwordConfirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    // Préparer les données à envoyer
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    try {
      // Envoi des données au backend avec fetch
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Traitement de la réponse
      const data = await response.json();

      if (response.ok) {
        // Si l'inscription est réussie, redirige l'utilisateur
        navigate('/login');
      } else {
        // Si l'inscription échoue, afficher un message d'erreur
        setError(data.message || 'Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="w-12 h-12 bg-red-600 rounded-full mx-auto flex items-center justify-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-red-600">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Créez votre compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Ou{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              connectez-vous à votre compte existant
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="first-name" className="sr-only">
                Prénom
              </label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-dark-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Prénom"
              />
            </div>
            <div>
              <label htmlFor="last-name" className="sr-only">
                Nom
              </label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-dark-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Nom"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-dark-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Adresse email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-dark-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
              />
            </div>
            <div>
              <label htmlFor="password-confirm" className="sr-only">
                Confirmez le mot de passe
              </label>
              <input
                id="password-confirm"
                name="password-confirm"
                type="password"
                required
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-dark-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirmez le mot de passe"
              />
            </div>
          </div>

          {/* Afficher un message d'erreur s'il y en a une */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Créer un compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
