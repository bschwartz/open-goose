$(document).ready ->


  window.loadClickHandlers = ->
    readFolderHandler()
    readFileHandler()
    breadcrumbHandler()


  # Handle clicking on a folder in the sidebar
  window.readFolderHandler = ->
    $('li.folder').click (e) ->
      path = $(this).find('a').attr 'data-path'
      renderFolder path
      updateState path


  # Handle clicking on a file in the sidebar
  window.readFileHandler = ->
    $('li.file').click (e) ->
      path = $(this).find('a').attr 'data-path'
      renderFile path
      updateState path


  # Handle clicking on save file button
  window.saveFileHandler = ->
    $('.save').click (e) ->
      path = goose.currentPath
      if path
        val = $('#preview input').val();
        goose.writeFile path, val, (file) ->
          renderFile(file)


  # Handle clicking on create file button
  window.createFileHandler = ->
    $('.new_file').click (e) ->
      e.preventDefault()
      path = prompt('What do you want to name this file?')
      goose.writeFile path, '', (file) ->
        load(location.href)


  # Handle clicking on create folder button
  window.createFolderHandler = ->
    $('.new_folder').click (e) ->
      e.preventDefault()
      path = prompt('What do you want to call this folder?')
      goose.createFolder path, (file) ->
        load(location.href)


  window.breadcrumbHandler = ->
    $('li.crumb').click (e) ->
      path = $(this).attr 'data-path'
      if path is '/'
        load "#{location.host}/"
      else
        load "#{location.host}/?path=#{encodeURI(path)}"


  window.updateState = (path) ->
    if path is ''
      $('#breadcrumb').html('<ul><li class="crumb" data-path="/">Goose</li></ul>')
      state = location.pathname
      history.replaceState(state, state, state)
    else
      state = "#{location.pathname}?path=#{path}"
      history.replaceState(state, state, state)
      breadcrumb = ['<li class="crumb" data-path="/">Goose</li>']
      for crumb, i in path.split('/')
        breadcrumb.push("<li class=\"crumb\" data-path=\"#{path.split('/').slice(0, i + 1).join('/')}\">#{crumb}</li>")
      $("#breadcrumb").html "<ul>#{breadcrumb.join('')}</ul>"


  # Render the sidebar for a specific folder
  window.renderFolder = (folder) ->
    goose.readDir folder, (files) ->
      fileNames = []
      readme = null
      for file in files
        path = file.path.split(goose.rootDir)[1]
        if file.isFolder
          fileNames.push "<li class=\"folder\"><a data-path=\"#{path}\">#{file.name}</a></li>"
        else
          if file.name.match(/README\.md$/i)
            readme = file.path
          fileNames.push "<li class=\"file\"><a data-path=\"#{path}\">#{file.name}</a></li>"

      $('.nav_col').html "<ul>#{fileNames.join('')}</ul>"
      $('#content').html '<p></p>'

      renderFile goose.relativeDir(readme) if readme
      updateState goose.relativeDir(readme) if readme
      loadClickHandlers()


  # Render the content for a specific file
  window.renderFile = (file) ->
    goose.readFile file, (content) ->
      if goose.currentPath().match(/\.md$/)
        val = emojify(markdown.toHTML(content))
      else
        val = $('<div/>').text(content).html()
      $('#content p').html(val)
      loadClickHandlers()


  # Initiate Open Goose at a specified folder/file path
  window.load = (fullpath) ->
    href = decodeURI(fullpath.substring(0, fullpath.length))
    query_params = href.split('?')[1]
    if query_params
      path = query_params.match(/path=([^\/#&]+)/)[1]
    else
      path = '/'

    goose.stat path, (file) ->
      if file.isFolder
        folderPath = goose.relativeDir file.path
        renderFolder folderPath
        updateState folderPath
      else
        pathParts = goose.relativeDir(file.path).split(/\/+/)
        folderPath = pathParts.slice(0, pathParts.length - 1).join('/')

        renderFolder folderPath
        renderFile pathParts.join '/'
        updateState pathParts.join '/'


  load(location.href)
  createFolderHandler()
  createFileHandler()


