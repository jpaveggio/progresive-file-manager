import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MatTabGroup} from '@angular/material';

interface File {
  id: number;
  type: string;
  name: string;
  size: number;
  parent?: number;
}

// TODO: Agregar directorio raiz
const tree: File[] = [
  {id: 0, name: '', size: 0, parent: null, type: 'directory'},
  {id: 1, name: 'books', size: 0, parent: 0, type: 'directory'},
  {id: 2, name: 'images', size: 0, parent: 0, type: 'directory'},
  {id: 3, name: 'docs', size: 0, parent: 0, type: 'directory'},
  {id: 4, name: 'todo.txt', size: 213, parent: 3, type: 'txt'},
  {id: 5, name: 'me.jpg', size: 11293, parent: 0, type: 'jpg'},
  {id: 6, name: 'Matemática', size: 0, parent: 1, type: 'directory'},
  {id: 7, name: 'Música', size: 0, parent: 1, type: 'directory'},
  {id: 8, name: 'Programación', size: 0, parent: 1, type: 'directory'},
  {id: 9, name: 'Mi Libro.pdf', size: 2340, parent: 1, type: 'pdf'},
  {id: 10, name: 'Agebra.pdf', size: 12292, parent: 6, type: 'pdf'},
  {id: 11, name: 'Vectores.pdf', size: 21233, parent: 6, type: 'pdf'},
  {id: 12, name: 'Syncopation.pdf', size: 23653, parent: 7, type: 'pdf'},
  {id: 13, name: 'funcional', size: 0, parent: 8, type: 'directory'},
  {id: 14, name: 'poo', size: 0, parent: 8, type: 'directory'},
  {id: 15, name: 'common-lisp.pdf', size: 6100, parent: 13, type: 'pdf'},
  {id: 16, name: 'functional-techniques.pdf', size: 5980, parent: 13, type: 'pdf'},
  {id: 17, name: 'java.pdf', size: 199338, parent: 14, type: 'pdf'},
  {id: 18, name: 'design-patterns.pdf', size: 48620, parent: 14, type: 'pdf'},
  {id: 19, name: 'small-talk.pdf', size: 3233, parent: 14, type: 'pdf'}
];

@Component({
  selector: 'pfm-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  private $currentDirectory = new BehaviorSubject<number>(0);
  displayedColumns = ['name', 'size', 'type'];

  @ViewChild('pathTabs')
  pathTabs: MatTabGroup;

  constructor() { }

  ngOnInit() {
  }

  getDirectoryById(id: number): File {
    return tree.find(f => f.id === id);
  }

  get currentDirectory(): File {
    return this.getDirectoryById(this.$currentDirectory.getValue());
  }

  getDirectoryList(dir?: File): File[] {
    return tree.filter(f => f.parent === (dir ? dir.id : this.$currentDirectory.getValue()));
  }

  get directoryPath(): File[] {
    const path: File[] = [this.currentDirectory];
    while (path[0].parent !== null) {
      path.unshift(this.getDirectoryById(path[0].parent));
    }
    return path;
  }

  gotoDirectory(dir: File) {
    if (dir.type === 'directory') {
      this.$currentDirectory.next(dir.id);
      this.pathTabs.selectedIndex = this.directoryPath.length;
    }
  }

  goUp() {
    this.$currentDirectory.next(this.currentDirectory.parent || 0);
  }

}
