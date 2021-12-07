import React from 'react';

function PostForm() {
  return (
    <div>
      <div className="container">
        <form>
          <div className="row pt-5 mx-auto">
            <div className="col-8 form-group mx-auto">
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="Contact Name"
              />
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <input
                type="number"
                name="number"
                className="form-control"
                id="number"
                placeholder="Eenter Emergency Contact"
              />
            </div>
            <div className="col-8 pt-3 mx-auto">
              <input type="submit" className="btn btn-success" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
