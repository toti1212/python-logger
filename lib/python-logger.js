'use babel';

import PythonLoggerView from './python-logger-view';
import { CompositeDisposable } from 'atom';

export default {

  pythonLoggerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pythonLoggerView = new PythonLoggerView(state.pythonLoggerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pythonLoggerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'python-logger:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pythonLoggerView.destroy();
  },

  serialize() {
    return {
      pythonLoggerViewState: this.pythonLoggerView.serialize()
    };
  },

  toggle() {
    console.log('PythonLogger was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
