import { useAuthStore } from "../stores/useAuthStore";

export const ProfilePage = () => {

    const user = useAuthStore((state) => state.user);
    if (!user) {
        return <div>Chargement du profil...</div>;
    }

    const handlePremium = async () => {
        const res = await fetch("http://localhost:3000/api/stripe/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id }),
        });

        const data = await res.json();
        window.location.href = data.url;
      };
      
    return (
        <div className="flex flex-col bg-gray-50 dark:bg-gray-800 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Mon Profil</h1>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-lg">

                <div className="space-y-5">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Adresse email</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-white">{user.email}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Nom complet</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-white">{user?.first_name} {user?.last_name} </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Inscrit depuis</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-white">
                            {new Date(user.created_at).toLocaleDateString("fr-FR", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Statut</p>
                        <span
                            className={`inline-block mt-1 px-3 py-1 text-sm rounded-full font-medium ${user.is_premium
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                }`}
                        >
                            {user.is_premium ? "Membre Premium" : "Compte Gratuit"}
                        </span>
                    </div>

                    <div className="pt-4">
                        {!user.is_premium ? (
                            <button
                                onClick={handlePremium}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
                            >
                                Passer en premium
                            </button>
                        ) : (
                            <button
                                onClick={() => alert("Redirection vers la gestion de l'abonnement")}
                                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-xl transition duration-200"
                            >
                                Gérer mon abonnement
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
