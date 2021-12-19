  const taskComponent = new PointListView(point);
      const taskEditComponent = new FormEditView(point);

      const replaceCardToForm = () => {
        replace(taskEditComponent, taskComponent);
      };

      const replaceFormToCard = () => {
        replace(taskComponent, taskEditComponent);
      };

      const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          replaceFormToCard();
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

      taskComponent.setEditClickHandler(() => {
        replaceCardToForm();
        document.addEventListener('keydown', onEscKeyDown);
      });

      taskEditComponent.setFormSubmitHandler(() => {
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      });

      render(taskListElement, taskComponent, RenderPosition.AFTERBEGIN);
