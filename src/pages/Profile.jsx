import { userProfile } from '../data/mockData';

function Profile() {
  return (
    <section className="page-section">
      <div className="panel">
        <div className="profile-top">
          <div className="profile-main">
            <div className="avatar">
              {userProfile.name.charAt(0)}
            </div>

            <div>
              <h1>{userProfile.name}</h1>
              <p className="profile-email">{userProfile.email}</p>
            </div>
          </div>

          <button className="secondary-button" type="button">Edit Profile</button>
        </div>
      </div>

      <div className="profile-grid">
        <div className="panel">
          <h2>Household</h2>
          <ul className="info-list">
            <li><strong>Household Size:</strong> {userProfile.household}</li>
            <li><strong>Location:</strong> {userProfile.location}</li>
          </ul>
        </div>

        <div className="panel">
          <h2>Preferences</h2>
          <ul className="info-list">
            <li><strong>Alert Preference:</strong> {userProfile.preferredAlert}</li>
            <li><strong>Theme:</strong> {userProfile.theme}</li>
          </ul>
        </div>

        <div className="panel">
          <h2>Usage History</h2>
          <ul className="info-list">
            <li>Last inventory review: 2 days ago</li>
            <li>Items currently tracked: 8</li>
            <li>Expiring items: 2</li>
          </ul>
        </div>

        <div className="panel">
          <h2>Account</h2>
          <ul className="info-list">
            <li>Saved settings available</li>
            <li>Profile is active</li>
            <li className="sign-out">Sign Out</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Profile;