/** Message component that takes in a message and bootstrap alert type
 *
 * Returns a dismissible flash message
 *
 * props:
 * - message: string
 * - alertStatus: string
 */

function FlashMessage({ message, alertStatus }) {
  return (
    <div
      className={`pb-3 pt-1 alert alert-dismissible alert-${alertStatus}`}
    >
      {message}
    </div>
  );
}

export default FlashMessage;