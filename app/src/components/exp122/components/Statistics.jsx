import { memo } from "react";
import { useSelector } from "react-redux";

import {
  selectTotalPosts,
  selectFacebookPosts,
  selectLinkedInPosts,
  selectTwitterPosts,
} from "../features/posts/selectors";

const Statistics = () => {

  const total = useSelector(selectTotalPosts);

  const facebook = useSelector(
    selectFacebookPosts
  );

  const linkedin = useSelector(
    selectLinkedInPosts
  );

  const twitter = useSelector(
    selectTwitterPosts
  );

  return (

    <div className="stats">

      <div className="stat-card">

        <h3>Total</h3>

        <p>{total}</p>

      </div>

      <div className="stat-card">

        <h3>Facebook</h3>

        <p>{facebook.length}</p>

      </div>

      <div className="stat-card">

        <h3>LinkedIn</h3>

        <p>{linkedin.length}</p>

      </div>

      <div className="stat-card">

        <h3>Twitter</h3>

        <p>{twitter.length}</p>

      </div>

    </div>

  );

};

export default memo(Statistics);
